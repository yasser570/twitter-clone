import { OperationVariables, QueryResult } from "@apollo/client";
import React from "react";
import styled from "styled-components";
import { TweetsQueryDataT } from ".";
import { Tweet } from "../../components/tweet";

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const TimeLine: React.FC<QueryResult<TweetsQueryDataT, OperationVariables>> = ({
  loading,
  error,
  data,
}) => {
  if (loading) return <span>...</span>;

  if (error) return <span>!!!</span>;

  if (!data?.tweets) return <span>???</span>;

  return (
    <Container>
      {data.tweets.map((t) => (
        <Tweet key={t._id} {...t} />
      ))}
    </Container>
  );
};

export default TimeLine;
