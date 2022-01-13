import React from "react";
import { useParams } from "react-router-dom";

const TweetPage = () => {
  const { id } = useParams<{ id: string }>();

  return <div>tweet {id}</div>;
};

export default TweetPage;
