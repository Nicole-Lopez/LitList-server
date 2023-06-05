import { RESTDataSource } from '@apollo/datasource-rest'
import type {
    BookDetail,
    BookSlide,
    BookSlider,
} from '../../__generated__/resolvers-types'
import type { GetBooksBestSellersParams, GetDetailBookResponse } from '../../models/index.js'
import { getImageLink, AVAILABLE_SUBJECTS, getAuthors } from '../../utilities/formatsBook.js'

const GOOGLEBOOKS_API_PARAM_DEFAULT = {
    printType: 'books',
    key: process.env.GOOGLEBOOKS_APIKEY
}


export class BooksAPI extends RESTDataSource {
    override baseURL = 'https://www.googleapis.com/books/v1/'

    async getBooksBestSellers(
        book: GetBooksBestSellersParams
    ): Promise<BookSlide> {
        const result: BookSlide[] = []

        for (let i = 0; i < book.isbns.length; ++i) {
            const { items } = await this.get('volumes', {
                params: {
                    q: `+isbn:${book.isbns[i]}`,
                    ...GOOGLEBOOKS_API_PARAM_DEFAULT
                },
            })

            if (items !== undefined) {
                result.push({
                    id: items[0].id,
                    title: items[0].volumeInfo.title,
                    authors: getAuthors(items[0].volumeInfo.authors),
                    cover: getImageLink(items[0].volumeInfo.imageLinks),
                })
                break
            }
        }

        if (result.length === 0) {
            const { items } = await this.get('volumes', {
                params: {
                    q: `+intitle:${book.title}+inauthor:${book.author}`,
                    ...GOOGLEBOOKS_API_PARAM_DEFAULT
                },
            })

            result.push({
                id: items[0].id,
                title: items[0].volumeInfo.title,
                authors: getAuthors(items[0].volumeInfo.authors),
                cover: getImageLink(items[0].volumeInfo.imageLinks),
            })
        }

        return result[0]
    }

    async getSearchBook(term: string, startIndex: string) {
        const data = await this.get('volumes', {
            params: {
                q: `${term}`,
                maxResults: '40',
                startIndex,
                ...GOOGLEBOOKS_API_PARAM_DEFAULT
            },
        })

        return data
    }

    async getDetailBook(id: string): Promise<GetDetailBookResponse> {
        const { volumeInfo } = await this.get(`volumes/${id}`)

        const result: GetDetailBookResponse = {
            title: volumeInfo.title,
            subtitle: volumeInfo.subtitle ?? '',
            authors: getAuthors(volumeInfo.authors),
            cover: getImageLink(volumeInfo.imageLinks),
            description: volumeInfo.description ?? '',
            additionalInfo: [
                { title: 'pageCount', info: volumeInfo.pageCount ?? '' },
                {
                    title: 'publishedDate',
                    info: volumeInfo.publishedDate ?? '',
                },
                { title: 'language', info: volumeInfo.language ?? '' },
                { title: 'publisher', info: volumeInfo.publisher ?? '' },
            ],
        }

        if (volumeInfo.categories !== undefined) {
            result.subjects = [
                {
                    type: AVAILABLE_SUBJECTS[0],
                    value: volumeInfo.categories,
                },
            ]
        }

        if (volumeInfo.industryIdentifiers !== undefined) {
            result.isbn = volumeInfo.industryIdentifiers.map(e => e.identifier)
        }

        return result
    }

    async getBooksByAuthor(author: string): Promise<BookSlider> {
        const { items } = await this.get('volumes', {
            params: {
                q: `${author}`,
                maxResults: '40',
                startIndex: '0',
                ...GOOGLEBOOKS_API_PARAM_DEFAULT
            },
        })

        const content: BookSlide[] = items
            .filter(book => book.volumeInfo.authors?.includes(author))
            .map(book => ({
                id: book.id,
                title: book.volumeInfo.title,
                authors: getAuthors(book.volumeInfo.authors),
                cover: getImageLink(book.volumeInfo.imageLinks),
            }))
            .slice(0, 20)

        return { author, content }
    }

    async getBookId(title: string, author: string): Promise<string> {
        const data = await this.get('volumes', {
            params: {
                q: `+intitle:"${title}"+inauthor:"${author}"`,
                maxResults: '40',
                startIndex: '0',
                ...GOOGLEBOOKS_API_PARAM_DEFAULT
            },
        })

        if (data.items !== undefined) {
            const findBookByTitle = data.items.find(
                e => e.volumeInfo.title === title
            )

            return findBookByTitle !== undefined
                ? findBookByTitle.id
                : data.items[0].id
        } else {
            return 'Not found'
        }
    }
}
