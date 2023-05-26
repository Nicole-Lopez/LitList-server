import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import resolvers from './schema/resolvers/index.js'
import { readFileSync } from 'fs'
import { BestSellersAPI } from './schema/dataSources/BestSellersAPI.js'
import { BooksAPI } from './schema/dataSources/BooksAPI.js'

import dotenv from 'dotenv'
dotenv.config()

const typeDefs = readFileSync('./schema.graphql', { encoding: 'utf-8' })

export interface ContextServer {
    dataSources: {
        bestSellersAPI: BestSellersAPI
        booksAPI: BooksAPI
    }
}

const server = new ApolloServer<ContextServer>({
    typeDefs,
    resolvers,
})

const { url } = await startStandaloneServer(server, {
    context: async () => {
        const { cache } = server
        return {
            dataSources: {
                bestSellersAPI: new BestSellersAPI({ cache }),
                booksAPI: new BooksAPI({ cache }),
            },
        }
    },

    listen: { port: Number(process.env.PORT) },
})

console.log(`🚀  Server ready at: ${url}`)
