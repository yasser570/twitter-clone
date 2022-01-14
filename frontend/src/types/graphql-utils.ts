export type UserT = {
  _id: string;
  name: string;
  username: string;
};

export type TweetT = {
  _id: string;
  user: UserT;
  body: string;
  created: string;
};
