import type {
	BookDetail,
	BookPreview,
	BookSlide,
	BookSlider,
	BestSellersSlider,
	QueryBestSellersListArgs,
	QueryBookDetailArgs,
	QueryBooksByAuthorArgs,
	QueryResolvers,
	QuerySearchBooksArgs,
	QueryBooksBySubjectArgs,
	QueryFindBookIdArgs,
} from '../../__generated__/resolvers-types'
import type { ContextServer } from '../../index'
import type { GetBooksBestSellersParams } from './../../models/index'
import {
	getImageLink,
	getISBN,
	getAuthors,
} from '../../utilities/formatsBook.js'

const queries: QueryResolvers = {
	Query: {
		bestSellersList: async (
			_,
			{ listName }: QueryBestSellersListArgs,
			{ dataSources }: ContextServer
		): Promise<BestSellersSlider> => {
			const bestSellers =
				await dataSources.bestSellersAPI.getBestSellersByList(listName)

			const bookParamFormat: GetBooksBestSellersParams[] =
				bestSellers.results.map(book => ({
					title: book.book_details[0].title,
					author: book.book_details[0].author,
					isbns: book.isbns.flatMap(isbn => {
						const aux = Object.values(isbn)

						return aux.every(e => !isNaN(Number(e))) ? aux : []
					}),
				}))

			const settledPromises: Array<PromiseSettledResult<BookSlide>> =
				await Promise.allSettled(
					// eslint-disable-next-line @typescript-eslint/promise-function-async
					bookParamFormat.map(bookParams =>
						dataSources.booksAPI.getBooksBestSellers(bookParams)
					)
				)

			const finalResult: BestSellersSlider = {
				last_modified: bestSellers.last_modified,
				books: settledPromises
					.filter(result => result.status === 'fulfilled')
					.map(
						(result: PromiseFulfilledResult<BookSlide>) =>
							result.value
					),
			}

			return finalResult
		},

		bookDetail: async (
			_,
			{ id }: QueryBookDetailArgs,
			{ dataSources }: ContextServer
		): Promise<BookDetail> => {
			const bookInfo = await dataSources.booksAPI.getDetailBook(id)

			if (bookInfo.isbn !== undefined) {
				for (let i = 0; i < bookInfo.isbn.length; ++i) {
					const data =
						await dataSources.subjectsAPI.getSubjectsByISBN(
							bookInfo.isbn[i]
						)

					if (data.length !== 0) {
						bookInfo.subjects = data
						break
					}
				}
			}

			return bookInfo
		},

		booksByAuthor: async (
			_,
			{ author }: QueryBooksByAuthorArgs,
			{ dataSources }: ContextServer
		): Promise<BookSlider> => {
			const books = await dataSources.booksAPI.getBooksByAuthor(author)

			return books
		},

		searchBooks: async (
			_,
			{ term }: QuerySearchBooksArgs,
			{ dataSources }: ContextServer
		): Promise<BookPreview[]> => {
			const result: BookPreview[] = []
			let offset = 0
			const max = 40

			while (result.length <= 2000) {
				let stopLoop: boolean = false
				const fetchApiArr: Array<Promise<unknown>> = []

				for (let i = 0; i < 5; i++) {
					fetchApiArr.push(
						dataSources.booksAPI.getSearchBook(
							term,
							offset.toString()
						)
					)

					offset += max
				}

				/**
				|--------------------------------------------------
				| Use of any due to the changing nature of the data fetched by the Google Books REST API.
				|--------------------------------------------------
				*/
				const settledPromises: Array<PromiseFulfilledResult<any>> =
					(await Promise.allSettled(fetchApiArr).then(results =>
						results.filter(p => p.status === 'fulfilled')
					)) as Array<PromiseFulfilledResult<any>>
				/**
				|--------------------------------------------------
				|--------------------------------------------------
				*/

				for (let j = 0; j < settledPromises.length; ++j) {
					const data = settledPromises[j].value

					if (data.items !== undefined) {
						for (let i = 0; i < data.items.length; ++i) {
							const { id, volumeInfo } = data.items[i]

							result.push({
								id,
								title: volumeInfo.title,
								authors: getAuthors(volumeInfo.authors),
								cover: getImageLink(volumeInfo.imageLinks),
								publishedYear: isNaN(
									Number(
										volumeInfo.publishedDate?.slice(0, 4)
									)
								)
									? 0
									: Number(
											volumeInfo.publishedDate.slice(0, 4)
									  ),
								pageCount: volumeInfo.pageCount ?? 0,
								categories: volumeInfo.categories ?? [],
								isbn: getISBN(volumeInfo.industryIdentifiers),
							})
						}
					} else {
						stopLoop = true
					}
				}

				if (stopLoop) {
					break
				}
			}

			return result
		},

		booksBySubject: async (
			_,
			{ subject }: QueryBooksBySubjectArgs,
			{ dataSources }: ContextServer
		): Promise<BookPreview[]> => {
			const totalBooks = 700
			const perCall = 50
			let offset = 0

			const fetchApiArr: Array<Promise<BookPreview[]>> = []

			for (let i = 0; i < totalBooks / perCall; i++) {
				fetchApiArr.push(
					dataSources.subjectsAPI.getBooksBySubject(
						subject,
						offset.toString(),
						perCall.toString()
					)
				)

				offset += perCall
			}

			const settledPromises: Array<
				PromiseFulfilledResult<BookPreview[]>
			> = (await Promise.allSettled(fetchApiArr).then(results =>
				results.filter(p => p.status === 'fulfilled')
			)) as Array<PromiseFulfilledResult<BookPreview[]>>

			const books: BookPreview[] = settledPromises
				.map(e => e.value)
				.flat(1)

			return books
		},

		findBookId: async (
			_,
			{ title, author }: QueryFindBookIdArgs,
			{ dataSources }: ContextServer
		): Promise<string> => {
			const id = await dataSources.booksAPI.getBookId(title, author)

			return id
		},
	},
}

export default queries
