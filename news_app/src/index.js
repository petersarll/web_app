const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const User = require('./resolvers/User')
const Link = require('./resolvers/Link')
const Subscription = require('./resolvers/Subscription')
const Vote = require('./resolvers/Vote')

async function main(){
  // Read all links from the database and print them to the console
  const allLinks = await prisma.links()
  console.log('these are the following database entries')
  console.log(allLinks)
}
main().catch(e => console.error(e))

const typeDefs = `
type Query {
  info: String!
}
`

const resolvers = {
    Query,
    Mutation,
    Subscription,
    User,
    Link,
    Vote,
  }


const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers,
  context: request => {
    return {
      ...request,
      prisma,
    }
  } 
})
server.start(() => console.log(`Server is running on http://localhost:4000`))