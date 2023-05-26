import { BookPreview } from '../../__generated__/resolvers-types'
import { RESTDataSource } from '@apollo/datasource-rest'

export class BooksAPI extends RESTDataSource {
    override baseURL = 'https://www.googleapis.com/books/v1/volumes'

    async getBookByISBN(isbn: string): Promise<BookPreview> {
        const { items } = await this.get('', {
            params: {
                q: `+isbn:${isbn}`,
                key: process.env.GOOGLEBOOKS_APIKEY
            },
        })

        let book: BookPreview = {
            id: items[0].id,
            selfLink: items[0].selfLink,
            title: items[0].volumeInfo.title,
            authors: items[0].volumeInfo.authors,
            cover: items[0].volumeInfo.imageLinks.thumbnail
        }

        return book
    }
}
