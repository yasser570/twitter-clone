import React from "react";
import styled from "styled-components";

const SButton = styled.button`
  cursor: pointer;
  border: none;
  background-color: transparent;
  &:focus {
    outline: none;
  }
`;

const Container = styled.div<{ $inverted?: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: 12px;
  width: 100%;
  max-width: 100%;
  background-color: ${({ theme, $inverted }) =>
    $inverted ? theme.colors.bg : theme.colors.primary};
  color: ${({ theme, $inverted }) =>
    $inverted ? theme.colors.primary : theme.colors.bg};
  border: 1px solid
    ${({ theme, $inverted }) =>
      $inverted ? theme.colors.primary : theme.colors.bg};
  transition: ${({ theme }) => theme.transition};
  &:hover {
    background-color: ${({ theme, $inverted }) =>
      $inverted ? theme.colors.hover : theme.colors.priHover};
  }
`;

const ButtonText = styled.span`
  color: inherit;
  font-size: ${({ theme }) => theme.font.size.lg};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  margin: 0 16px;
`;

export const Button: React.FC<{
  inverted?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset" | undefined;
}> = ({ inverted, onClick, type, children }) => {
  return (
    <SButton
      onClick={(e) => {
        e.stopPropagation();
        onClick && typeof onClick === "function" && onClick(e);
      }}
      type={type}
    >
      <Container $inverted={inverted}>
        <ButtonText>{children}</ButtonText>
      </Container>
    </SButton>
  );
};
