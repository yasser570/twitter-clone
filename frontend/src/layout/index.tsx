import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import LeftSidebar from "./leftSidebar";
import RightSidebar from "./rightSidebar";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  flex-grow: 1;
  flex-shrink: 1;
  display: flex;
  flex-direction: row;
  overflow: hidden;
`;

const LeftSidebarContainer = styled.div`
  width: 400px;
  height: 100%;
  flex-basis: 400px;
  flex-grow: 0;
  flex-shrink: 1;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const Main = styled.main`
  width: 100%;
  height: 100%;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: fill;
  display: flex;
  flex-direction: row;
  overflow: scroll;
`;

const PageContainer = styled.div`
  /* width: 100%; */
  height: 100%;
  flex-basis: fill;
  flex-grow: 1;
  flex-shrink: 1;
  border-left: 1px solid ${({ theme }) => theme.colors.hrBorder};
  border-right: 1px solid ${({ theme }) => theme.colors.hrBorder};
`;

const RightSidebarContainer = styled.div`
  position: sticky;
  top: calc(100% - 850px);
  height: 100%;
  flex-basis: 450px;
  flex-grow: 0;
  flex-shrink: 1;
  display: flex;
  flex-direction: row;
`;

const Layout = () => (
  <Container>
    <LeftSidebarContainer>
      <LeftSidebar />
    </LeftSidebarContainer>
    <Main>
      <PageContainer>
        <Outlet />
      </PageContainer>
      <RightSidebarContainer>
        <RightSidebar />
      </RightSidebarContainer>
    </Main>
  </Container>
);

export default Layout;
