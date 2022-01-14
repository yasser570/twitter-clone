import React from "react";
import styled from "styled-components";
import { LogoIcon } from "../../@ui/icons/logoIcon";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: 12px;
  width: fit-content;
  max-width: 100%;
  background-color: ${({ theme }) => theme.colors.transparent};
  transition: ${({ theme }) => theme.transition};

  &:hover {
    background-color: ${({ theme }) => theme.colors.iconHover};
  }
`;

const IconContainer = styled.div`
  color: ${({ theme }) => theme.colors.primary};
`;

export const Logo = () => (
  <Container>
    <IconContainer>
      <LogoIcon size="md" />
    </IconContainer>
  </Container>
);
