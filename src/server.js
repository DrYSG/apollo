//const { ApolloServer, gql } = require('apollo-server')
import { ApolloServer } from 'apollo-server'
import { typeDefs, resolvers } from './schema.js'
import * as DB from './db'

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// server.listen().then(({ url }) => {
//   console.log(`🚀  Server ready at ${url}`)
// })


async function setup() {
  let {url} = await server.listen()
  console.log(`🚀  Server ready at ${url}`)
  await DB.dbSetup()
  await DB.populate()
  let users = await DB.findAll()
  console.log(users)
  DB.close()
}

setup()