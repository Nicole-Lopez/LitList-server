import {
	BookPreview,
	QueryResolvers,
	BestSellersListResponse,
} from '../../__generated__/resolvers-types'
import { ContextServer } from '../../index'

interface BestSellersListArgs {
	listName: string
}

const queries: QueryResolvers = {
	Query: {
		bestSellersList: async (
			_,
			{ listName }: BestSellersListArgs,
			{ dataSources }: ContextServer
		): Promise<BestSellersListResponse> => {
			const bestSellers =
				await dataSources.bestSellersAPI.getBestSellersByList(listName)

			let finalResult: BestSellersListResponse

			let booksInfo: BookPreview[] = []
			for (let i = 0; i <= bestSellers.results.length - 1; i++) {
				let book = await dataSources.booksAPI.getBookByISBN(
					bestSellers.results[i].isbns[0].isbn10
				)

				booksInfo.push(book)
			}

			finalResult = {
				last_modified: bestSellers.last_modified,
				books: booksInfo,
			}

			return finalResult
		},
	},
}

export default queries
