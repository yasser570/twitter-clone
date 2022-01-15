import React from "react";
import styled from "styled-components";
import { CustomIcon } from "../../@ui/customIcon";

const Container = styled.div`
  margin-bottom: 12px;

  background-color: ${({ theme }) => theme.colors.bg2};
  border-radius: 16px;
`;

const HeaderContainer = styled.div`
  top: 0;
  padding: 12px 16px;
  display: flex;
  align-items: center;
`;

const Title = styled.span`
  font-size: ${({ theme }) => theme.font.size.lg};
  font-weight: ${({ theme }) => theme.font.weight.bold};
`;

const trindsList: Trind[] = [
  { title: "trind 1", tweetsNum: "876k", trindingIn: "Jordan" },
  { title: "trind 2", tweetsNum: "452k", trindingIn: "Jordan" },
  { title: "trind 3", tweetsNum: "422k", trindingIn: "Jordan" },
  { title: "trind 4", tweetsNum: "345k", trindingIn: "Jordan" },
  { title: "trind 5", tweetsNum: "245k", trindingIn: "Jordan" },
  { title: "trind 6", tweetsNum: "149k", trindingIn: "Jordan" },
];
// **************************
//          TRIND ITEM
// **************************

type Trind = {
  title: string;
  tweetsNum: string;
  trindingIn: string;
};

const TIContainer = styled.div`
  padding: 12px 16px;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.transparent};
  transition: ${({ theme }) => theme.transition};
  &:hover {
    background-color: ${({ theme }) => theme.colors.tweetHover};
  }
`;

const TIHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  height: 13px;
  z-index: 1;
`;

const SmallSpan = styled.span`
  display: block;
  font-size: ${({ theme }) => theme.font.size.sm};
  font-weight: ${({ theme }) => theme.font.weight.normal};
  color: ${({ theme }) => theme.colors.textSec};
`;
const TITitle = styled.span`
  display: block;
  font-size: ${({ theme }) => theme.font.size.lg};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.colors.textPri};
  margin-top: 2px;
  margin-bottom: 4px;
`;

const TrindItem = (trind: Trind) => {
  return (
    <TIContainer>
      <TIHeader>
        <SmallSpan>{`Trending in ${trind.trindingIn}`}</SmallSpan>
        <CustomIcon
          type="button"
          fill="ter"
          fillOnHover="pri"
          label="More"
          onClick={() => console.log("...")}
          icon={
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <g>
                <circle cx="5" cy="12" r="2"></circle>
                <circle cx="12" cy="12" r="2"></circle>
                <circle cx="19" cy="12" r="2"></circle>
              </g>
            </svg>
          }
        />
      </TIHeader>
      <TITitle>{trind.title}</TITitle>
      <SmallSpan>{`${trind.tweetsNum} Tweets`}</SmallSpan>
    </TIContainer>
  );
};

const Trends: React.FC = () => {
  return (
    <Container>
      <HeaderContainer>
        <Title>Trends for you</Title>
      </HeaderContainer>
      {trindsList.map((ti) => (
        <TrindItem key={ti.title} {...ti} />
      ))}
    </Container>
  );
};

export default Trends;
