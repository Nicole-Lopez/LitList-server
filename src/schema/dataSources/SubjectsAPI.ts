import { RESTDataSource } from '@apollo/datasource-rest'
import type {
    BookPreview,
    BookSubjects,
} from '../../__generated__/resolvers-types'
import {
    AVAILABLE_SUBJECTS,
    COVER_DEFAULT,
    getAuthors,
} from '../../utilities/formatsBook.js'

export class SubjectsAPI extends RESTDataSource {
    override baseURL = 'https://openlibrary.org/'

    async getSubjectsByISBN(isbn: string) {
        const data = await this.get('search.json', {
            params: {
                q: `isbn:${isbn}`,
                mode: 'everything',
                fields: 'subject,place,person,availability',
                limit: '5',
                offset: '0',
            },
        })

        const result: BookSubjects[] = []

        if (data.docs.length !== 0) {
            for (let i = 0; i < AVAILABLE_SUBJECTS.length; ++i) {
                const currentSubject = AVAILABLE_SUBJECTS[i]

                if (data.docs[0][currentSubject] !== undefined) {
                    result.push({
                        type: currentSubject,
                        value: data.docs[0][currentSubject],
                    })
                }
            }
        }

        return result
    }

    async getBooksBySubject(subject: string, offset: string, limit: string) {
        const { docs } = await this.get('search.json', {
            params: {
                q: `subject:${subject}`,
                mode: 'everything',
                fields: 'key,title,author_name,cover_i,first_publish_year,publish_year,number_of_pages_median,subject,isbn,availability',
                limit,
                offset,
            },
        })

        if (docs.length !== 0) {
            const result: BookPreview[] = docs.map(book => ({
                id: `${book.key.split('/')[2] as string}(NOT GOOGLE)`,
                title: book.title,
                authors: getAuthors(book.author_name?.slice(0, 1)),
                cover:
                    book.cover_i !== undefined
                        ? `https://covers.openlibrary.org/b/id/${
                              book.cover_i as string
                          }-L.jpg`
                        : COVER_DEFAULT,
                publishedYear:
                    book.first_publish_year ??
                    (book.publish_year !== undefined
                        ? book.publish_year[0]
                        : 0),
                pageCount: book.number_of_pages_median ?? 0,
                categories: book.subject ?? [],
                isbn: book.isbn?.slice(0, 5) ?? [],
            }))

            return result
        } else {
            return []
        }
    }
}
