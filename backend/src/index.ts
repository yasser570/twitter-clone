import { ApolloServer, gql } from "apollo-server-express";
// import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import express from "express";
import http from "http";
import mongoose from "mongoose";
import TweetModel from "./models/tweetModel";
import UserModel from "./models/userModel";
import session from "express-session";

declare module "express-session" {
  interface Session {
    userId?: string;
  }
}

interface Context {
  req: express.Request;
  res: express.Response;
}

mongoose.connect("mongodb://localhost:27017/twclonedb");

mongoose.connection.on("error", console.error.bind(console, "mongoDB error:"));

const typeDefs = gql`
  scalar DateTime

  type Query {
    tweets: [Tweet!]!
    tweet(id: String!): Tweet
    currentUser: User
  }
  type Mutation {
    tweet(body: String!): Tweet
    login(username: String!, password: String!): User
    signup(username: String!, name: String!, password: String!): User!
  }
  type Tweet {
    _id: String!
    # userId: String!
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

const resolvers = {
  Query: {
    tweets: async () => {
      const tweets = TweetModel.find()
        .populate("user")
        .sort({ createdAt: -1 })
        .exec((err, res) => {
          console.log(err);
        });
      console.log(tweets);

      return tweets;
    },
    tweet: async (_: any, { id }: { id: string }) => {
      const tweet = TweetModel.findById(id)
        .populate("user")
        .exec((err, res) => {
          console.log(err);
          console.log(res);
        });
      console.log(tweet);

      return tweet;
    },
    currentUser: async (_: any, __: any, { req }: Context) => {
      console.log(req.session);
      console.log(req.sessionID);

      const user = await UserModel.findById(req.session.userId);

      console.log(user);

      return user;
    },
  },
  Mutation: {
    signup: async (
      _: any,
      {
        username,
        name,
        password,
      }: {
        username: string;
        name: string;
        password: string;
      },
      { req }: Context
    ) => {
      const user = new UserModel({
        username,
        name,
        password,
      });
      await user.save().catch((err) => console.error(err));

      req.session.userId = user._id;

      return user;
    },
    login: async (
      _: any,
      { username, password }: { username: string; password: string }
    ) => {
      const u = await UserModel.findOne({ username });
      console.log(u);

      if (u?.password === password) {
        console.log("should login");
      }
      return u;
    },
    tweet: async (_: any, { body }: { body: string }) => {
      // find the user
      // const tweet = new TweetModel({
      //   user: user._id,
      //   body,
      // });
      console.log(body);
    },
  },
};

async function listen(port: number) {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    // plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: ({ req, res }) => ({
      req,
      res,
    }),
  });
  await server.start();

  const app = express();

  app.use(
    session({
      name: "mm",
      secret: "646as654s6ad46s4",
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      },
    })
  );

  const httpServer = http.createServer(app);

  server.applyMiddleware({
    app,
    cors: {
      credentials: true,
      origin: ["http://localhost:3000", "http://localhost:4000"],
    },
  });

  return new Promise((resolve, reject) => {
    httpServer.listen(port).once("listening", resolve).once("error", reject);
  });
}

async function main() {
  try {
    await listen(4000);
    console.log("🚀 Server is ready at http://localhost:4000/graphql");
  } catch (err) {
    console.error("💀 Error starting the node server", err);
  }
}

void main();
