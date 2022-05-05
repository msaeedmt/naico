const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const http = require('http');
const express = require("express");

const config = require('./config.json')
const typeDefs = require('./Graphql/schema');
const resolvers = require('./Graphql/resolvers');
const db = require('./Database/database')
const models = require('./Database/models');

async function startApolloServer() {
  
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: { models },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  server.applyMiddleware({
    app,
    path: config.server.path
  });

  await new Promise(resolve => httpServer.listen({ port: config.server.port }, resolve));
  console.log(`Server ready at http://${config.server.host}:${config.server.port}${server.graphqlPath}`);
}

startApolloServer()