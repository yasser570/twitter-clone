import React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: sticky;
  top: 0;
  padding-left: 16px;
  padding-right: 16px;
  height: 53px;
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.bg};
  z-index: 5;
`;

const Title = styled.span`
  font-size: ${({ theme }) => theme.font.size.lg};
  font-weight: ${({ theme }) => theme.font.weight.bold};
`;

export const PageHeader: React.FC<{ title: string }> = ({ title }) => {
  return (
    <Container>
      <Title>{title}</Title>
    </Container>
  );
};
