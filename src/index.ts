import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { readFileSync } from 'fs'
import dotenv from 'dotenv'
import resolvers from './schema/resolvers/index.js'
import { BestSellersAPI } from './schema/dataSources/BestSellersAPI.js'
import { BooksAPI } from './schema/dataSources/BooksAPI.js'
import { SubjectsAPI } from './schema/dataSources/SubjectsAPI.js'

const typeDefs = readFileSync('./schema.graphql', { encoding: 'utf-8' })
dotenv.config()

export interface ContextServer {
    dataSources: {
        bestSellersAPI: BestSellersAPI
        booksAPI: BooksAPI
        subjectsAPI: SubjectsAPI
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
                subjectsAPI: new SubjectsAPI({ cache }),
            },
        }
    },

    listen: { port: Number(process.env.PORT) },
})

console.log(`Server ready at: ${url}`)
