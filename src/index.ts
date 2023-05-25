import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { resolvers } from './schema/resolvers.js'
import { typeDefs } from './schema/typeDefs.js'
import dotenv from 'dotenv'

dotenv.config()


const server = new ApolloServer({
    typeDefs,
    resolvers,
})

const { url } = await startStandaloneServer(server, {
    listen: { port: Number(process.env.PORT) },
})

console.log(`🚀  Server ready at: ${url}`)
