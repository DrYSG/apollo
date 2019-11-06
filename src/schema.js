import { gql } from 'apollo-server'
import DB from './db'
import {GraphQLDateTime} from 'graphql-iso-date'

export const typeDefs = gql`
  scalar DateTime

  type User {
    firstName: String
    lastName: String
    addressNumber: Int
    streetName: String
    city: String
    email: String
    createdAt: DateTime
    updatedAt: DateTime
  }
  type Query {
    users: [User]
    findUser(firstName: String): User
  }
`

export const resolvers = {
  Query: {
    users: async () => {
      let users = await DB.findAll()
      return users
    },
    findUser: async (parent, {firstName}) => {
      let who = await DB.findFirst(firstName)
      return who
    },
  }
}

export async function connect() {
  await DB.dbSetup()
  await DB.populate()
  let users = await DB.findAll()
  console.log(users)
}
