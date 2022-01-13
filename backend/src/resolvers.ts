import TweetModel from "./models/tweetModel";
import UserModel from "./models/userModel";
import { Context } from "./types/graphql-utils";

export const resolvers = {
  Query: {
    currentUser: async (_: any, __: any, { req }: Context) => {
      const user = await UserModel.findById(req.session.userId);

      return user;
    },
    tweets: async () => {
      const tweets = await TweetModel.find()
        .populate("user")
        .sort({ createdAt: -1 })
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
      const user = new UserModel({
        username,
        name,
        password,
      });
      await user.save().catch((err) => {
        console.error(err);
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
        throw new Error("user is not found");
      }

      if (user.password !== password) {
        throw new Error("wrong password");
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

      await tweet.save().catch((err) => {
        console.error(err);
        throw new Error("something went wrong");
      });
      return tweet;
    },
  },
};
