const { gql } = require('apollo-server');

const typeDefs = gql`
  type Candle {
    id: String!
    ticker: String!
    openTime: Float!
    open: Float!
    high: Float!
    low: Float!
    close: Float!
    volume: Float!
    closeTime: Float!
    trades: Int!
  }

  type Query {
    candle(id: String!): Candle
    allCandles(ticker: String!): [Candle!]!
  }
`;

module.exports = typeDefs;