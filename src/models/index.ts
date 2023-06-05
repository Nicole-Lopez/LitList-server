import type { BookDetail } from '../__generated__/resolvers-types'

export interface GetBooksBestSellersParams {
    title: string
    author: string
    isbns: string[]
}

export interface GetDetailBookResponse extends BookDetail {
    isbn?: string[]
}

