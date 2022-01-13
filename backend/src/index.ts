import { ApolloServer } from "apollo-server-express";
// import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import express from "express";
import http from "http";
import mongoose from "mongoose";
import session from "express-session";
import { resolvers } from "./resolvers";
import { typeDefs } from "./typeDefs";

mongoose.connect("mongodb://localhost:27017/twclonedb");

mongoose.connection.on("error", console.error.bind(console, "mongoDB error:"));

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
