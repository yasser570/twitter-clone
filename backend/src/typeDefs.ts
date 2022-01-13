import { gql } from "apollo-server-core";

export const typeDefs = gql`
  scalar DateTime

  type Query {
    currentUser: User
    tweets: [Tweet!]!
    tweet(id: String!): Tweet
  }
  type Mutation {
    signup(username: String!, name: String!, password: String!): User!
    login(username: String!, password: String!): User
    tweet(body: String!): Tweet
  }
  type Tweet {
    _id: String!
    user: User!
    body: String!
    created: DateTime!
  }
  type User {
    _id: String!
    name: String!
    username: String!
  }
`;
