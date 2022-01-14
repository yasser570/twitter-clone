import React from "react";
import { NavLink as NLink } from "react-router-dom";
import styled from "styled-components";
import { breakpoints } from "../../theme/media";

const SNLink = styled(NLink)`
  text-decoration: none;
  cursor: pointer;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: 12px;
  width: 100%;
  max-width: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;

const TextContainer = styled.span`
  color: ${({ theme }) => theme.colors.bg};
  font-size: ${({ theme }) => theme.font.size.lg};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  margin: 0 16px;
  ${breakpoints.down("md")} {
    display: none;
  }
`;

const TweetLink: React.FC = ({ children }) => {
  return (
    <SNLink to="/tweet">
      <Container>
        <TextContainer>Tweet</TextContainer>
      </Container>
    </SNLink>
  );
};

export default TweetLink;
