import TweetModel from "./models/tweetModel";
import UserModel from "./models/userModel";
import { Context } from "./types/graphql-utils";
import mongoose from "mongoose";
import { UserInputError } from "apollo-server-core";

export const resolvers = {
  Query: {
    currentUser: async (_: any, __: any, { req }: Context) => {
      const user = await UserModel.findById(req.session.userId);

      return user;
    },
    tweets: async () => {
      const tweets = await TweetModel.find()
        .populate("user")
        .sort({ created: -1 })
        .catch((err) => console.error(err));
      return tweets;
    },
    tweet: async (_: any, { id }: { id: string }) => {
      const tweet = await TweetModel.findById(id)
        .populate("user")
        .catch((err) => console.error(err));

      return tweet;
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
      // chick if the

      const user = new UserModel({
        username,
        name,
        password,
      });

      await user.save().catch((error) => {
        if (error instanceof mongoose.Error.ValidationError) {
          if (error.errors["name"]) {
            throw new UserInputError(error.errors["name"].message, {
              name: "name",
              inputName: "name",
            });
          }

          if (error.errors["username"]) {
            throw new UserInputError(error.errors["username"].message, {
              name: "username",
              inputName: "username",
            });
          }

          if (error.errors["password"]) {
            throw new UserInputError(error.errors["password"].message, {
              name: "password",
              inputName: "password",
            });
          }
        }
        // mongo error
        else if (error.code === 11000) {
          throw new UserInputError("username is already taken!", {
            name: "username",
            inputName: "username",
          });
        }

        throw new Error("something went wrong");
      });

      req.session.userId = user._id;

      return user;
    },
    login: async (
      _: any,
      { username, password }: { username: string; password: string },
      { req }: Context
    ) => {
      const user = await UserModel.findOne({ username }).catch((err) => {
        console.error(err);
        throw new Error("something went wrong");
      });

      if (!user) {
        throw new UserInputError("user is not found!", {
          name: "username",
          inputName: "username",
        });
      }

      if (user.password !== password) {
        throw new UserInputError("wrong password!", {
          name: "password",
          inputName: "password",
        });
      }

      req.session.userId = user._id;
      return user;
    },
    tweet: async (_: any, { body }: { body: string }, { req }: Context) => {
      if (!req.session.userId) {
        throw new Error("not logged in");
      }

      const tweet = new TweetModel({
        body,
        user: req.session.userId,
      });

      const newTweet = await tweet.save().catch((err) => {
        console.error(err);
        throw new Error("something went wrong");
      });

      const newTweetWithUser = await newTweet.populate("user");

      return newTweetWithUser;
    },
  },
};
