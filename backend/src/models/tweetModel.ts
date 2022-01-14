import mongoose from "mongoose";
import { IUser } from "./userModel";

const Schema = mongoose.Schema;

export interface ITweet {
  user: IUser;
  body: string;
  created: any;
}

const TweetSchema = new Schema<ITweet>({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  body: { type: String, maxlength: 280 },
  created: { type: Date, default: Date.now },
});

export default mongoose.model<ITweet>("Tweet", TweetSchema);
