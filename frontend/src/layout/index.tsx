import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import LeftSidebar from "./leftSidebar";

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

const RightSidebar = styled.div`
  /* width: 450px; */
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
      <RightSidebar>
        <div>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo
          voluptate impedit consequatur deleniti, sequi expedita sunt fugiat
          praesentium rem id voluptates natus accusamus inventore iure, nihil
          quibusdam culpa consectetur eum ipsum odit odio nesciunt placeat.
          Voluptate, corporis! Mollitia adipisci, beatae deserunt facere itaque
          aliquid consectetur minus rerum nulla veniam commodi!
        </div>
      </RightSidebar>
    </Main>
  </Container>
);

export default Layout;
