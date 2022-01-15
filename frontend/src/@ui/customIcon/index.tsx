import React from "react";
import { Link, LinkProps } from "react-router-dom";
import styled from "styled-components";

/**
 * color options
 * 1. pri // blue
 * 2. sec // textPri
 * 3. ter // textSec
 */
type IconFillOptionsT = "pri" | "sec" | "ter";

/**
 * color options
 * 1. pri // transparent blue
 * 2. sec // transparent gray
 */
type IconFillOnHoverOptionsT = "pri" | "sec" | boolean;

const IconContainer = styled.div<{
  $fill: IconFillOptionsT;
  $fillOnHover: IconFillOnHoverOptionsT;
}>`
  transition: ${({ theme }) => theme.transition};
  border-radius: ${({ theme }) => theme.borderRadius};
  width: 36px;
  height: 36px;
  padding: 8px;

  background-color: ${({ theme }) => theme.colors.transparent};
  color: ${({ theme, $fill }) =>
    $fill === "pri"
      ? theme.colors.primary
      : $fill === "sec"
      ? theme.colors.textPri
      : theme.colors.textSec};

  &:hover {
    background-color: ${({ theme }) => theme.colors.iconHover};
    color: ${({ theme, $fillOnHover }) =>
      $fillOnHover === "pri" ? theme.colors.primary : theme.colors.textPri};
  }
  svg {
    width: 20px;
    height: 20px;
    color: inherit;
    fill: currentColor;
  }
`;

const SButton = styled.button`
  margin: 0;
  padding: 0;
  border: 0;
  outline: none;
  background: transparent;
  cursor: pointer;
`;

type Props = {
  fill?: IconFillOptionsT;
  fillOnHover?: IconFillOnHoverOptionsT;
  icon: JSX.Element;
  label?: string;
} & (
  | { type: "icon"; onClick?: null; to?: null }
  | {
      type: "button";
      onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
      to?: null;
    }
  | { type: "link"; onClick?: null; to: LinkProps["to"] }
);

export const CustomIcon: React.FC<Props> = ({
  fill = "sec",
  fillOnHover = false,
  icon,
  label,
  type,
  to,
  onClick,
}) => {
  const myIcon = (
    <IconContainer $fill={fill} $fillOnHover={fillOnHover}>
      {icon}
    </IconContainer>
  );

  if (type === "button" && onClick)
    return <SButton onClick={onClick}>{myIcon}</SButton>;

  if (type === "link" && to) return <Link to={to}>{myIcon}</Link>;

  return myIcon;
};
