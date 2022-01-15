import React from "react";
import styled from "styled-components";
import Footer from "./footer";
import Search from "./search";
import Trends from "./trends";

const Container = styled.div`
  height: 100%;
  width: 80%;
  margin-left: 39px;

  display: flex;
  flex-direction: column;
`;

const RightSidebar = () => {
  return (
    <Container>
      <Search />
      <Trends />
      <Footer />
    </Container>
  );
};

export default RightSidebar;
