const { gql } = require('apollo-server');

const typeDefs = gql`
  enum StatusEnum {
    OPEN
    TARGET
    STOP
  }

  enum DecisionTypeEnum {
    CONFIRM
    REJECT
  }

  type Signal {
    _id: String!
    signalNumber: String!
    status: Int!
  }

  type Decision {
    _id: String!
    analyst: String!
    signal: Signal!
    analystDecision: Int!
  }

  type analystDecisions {
    _id: String!
    allDecisions: Int!
    trueDecisions: Int!
  }

  type Query {
    allDecisions: [Decision!]!
    allSignals: [Signal!]!
    getAnalysts: [analystDecisions!]!
  }
`;

module.exports = typeDefs;