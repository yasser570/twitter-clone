import React from "react";
import { NavLink as NLink, NavLinkProps } from "react-router-dom";
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
  width: fit-content;
  max-width: 100%;
  background-color: ${({ theme }) => theme.colors.transparent};
  transition: ${({ theme }) => theme.transition};
  &:hover {
    background-color: ${({ theme }) => theme.colors.hover};
  }
  ${SNLink}:hover & {
    background-color: ${({ theme }) => theme.colors.hover};
  }
`;

const IconContainer = styled.div`
  color: ${({ theme }) => theme.colors.textPri};
  ${breakpoints.down("lg")} {
    width: calc(39px - 12px);
    max-width: calc(39px - 12px);
    height: calc(39px - 12px);
    max-width: calc(39px - 12px);
  }
`;

const TextContainer = styled.span<{ $active: boolean }>`
  color: ${({ theme }) => theme.colors.textPri};
  font-size: ${({ theme }) => theme.font.size.lg};
  font-weight: ${({ theme, $active }) =>
    $active ? theme.font.weight.bold : theme.font.weight.normal};
  margin: 0 16px;
  ${breakpoints.down("lg")} {
    display: none;
  }
`;

const NavLink: React.FC<{
  to: NavLinkProps["to"];
  icon: JSX.Element;
}> = ({ to, icon, children }) => {
  return (
    <SNLink to={to}>
      {({ isActive }) => (
        <Container>
          <IconContainer>{icon}</IconContainer>
          <TextContainer $active={isActive}>{children}</TextContainer>
        </Container>
      )}
    </SNLink>
  );
};

export default NavLink;
