import { gql, useQuery } from "@apollo/client";
import React from "react";
import { PageHeader } from "../../@ui/pageHeader";
import { TweetT } from "../../types/graphql-utils";
import TweetForm from "./tweetForm";
import TimeLine from "./timeline";

export const TWEETS_QUERY = gql`
  query TweetsQuery {
    tweets {
      _id
      body
      created
      user {
        _id
        name
        username
      }
    }
  }
`;

export interface TweetsQueryDataT {
  tweets: TweetT[];
}

const HomePage = () => {
  const queryResult = useQuery<TweetsQueryDataT>(TWEETS_QUERY);

  console.log(queryResult.data);

  const afterTweetCreated = (tweet: TweetT) => {
    queryResult.updateQuery((prev) => ({
      tweets: [tweet, ...prev.tweets],
    }));
  };

  return (
    <div>
      <PageHeader title="Home" />
      <TweetForm afterTweetCreated={afterTweetCreated} />
      <TimeLine {...queryResult} />
    </div>
  );
};

export default HomePage;
