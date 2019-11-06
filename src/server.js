//const { ApolloServer, gql } = require('apollo-server')
import { ApolloServer } from 'apollo-server'
import { typeDefs, resolvers, connect } from './schema.js'

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

async function setup() {
  let { url } = await server.listen()
  console.log(`🚀  Server ready at ${url}`)
  await connect()
}

setup()