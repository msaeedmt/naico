const { ApolloServer } = require('apollo-server-express')
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core')
const http = require('http')
const express = require('express')

const config = require('./config/config.json')
const typeDefs = require('./graphql/schema')
const resolvers = require('./graphql/resolvers')
const models = require('./database/models')

require('./database/database')

const app = express()

async function startApolloServer () {
  const httpServer = http.createServer(app)
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: { models },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
  })

  await server.start()
  server.applyMiddleware({
    app,
    path: config.server.path
  })

  await new Promise(resolve => httpServer.listen({ port: process.env.PORT }, resolve))
  console.log(`Server ready at http://${config.server.host}:${process.env.PORT}${server.graphqlPath}`)
}

startApolloServer()

module.exports = { app }
