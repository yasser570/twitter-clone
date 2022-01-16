import mongoose from "mongoose";
import { ITweet } from "./tweetModel";

const Schema = mongoose.Schema;

export interface IUser {
  name: string;
  username: string;
  password: string;
  tweets: ITweet[];
  created: any;
}

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    maxlength: 50,
    minlength: [4, "name must be at least 4 characters"],
  },
  username: {
    type: String,
    maxlength: 15,
    minlength: [4, "username must be at least 4 characters"],
    unique: true,
  },
  password: {
    type: String,
    minlength: [4, "password must be at least 4 characters"],
  },
  tweets: [{ type: Schema.Types.ObjectId, ref: "Tweet" }],
  created: { type: Date, default: Date.now },
});

export default mongoose.model<IUser>("User", UserSchema);
