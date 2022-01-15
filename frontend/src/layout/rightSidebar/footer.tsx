import React from "react";
import styled from "styled-components";
import { Link as RLink } from "react-router-dom";

const Link = styled(RLink)`
  display: inline;
  font-size: inherit;
  font-weight: inherit;
  color: inherit;
  &:hover {
    text-decoration: underline;
  }
`;

const SmallSpan = styled.span`
  display: inline;
  font-size: ${({ theme }) => theme.font.size.sm};
  font-weight: ${({ theme }) => theme.font.weight.normal};
  color: ${({ theme }) => theme.colors.textSec};
  padding-right: 12px;
  margin-bottom: 2px;
  margin-top: 2px;
`;

const Footer: React.FC = () => (
  <footer>
    <p>
      <SmallSpan>
        <Link to="#">Terms of Service</Link>
      </SmallSpan>
      <SmallSpan>
        <Link to="#">Privacy Policy</Link>
      </SmallSpan>
      <SmallSpan>
        <Link to="#">Cookie Policy</Link>
      </SmallSpan>
      <SmallSpan>
        <Link to="#">Accessibility</Link>
      </SmallSpan>
      <SmallSpan>
        <Link to="#">Ads info</Link>
      </SmallSpan>
      <SmallSpan>
        <Link to="#">More</Link>
      </SmallSpan>
      <SmallSpan>© 2022 Twitter, Inc.</SmallSpan>
    </p>
  </footer>
);

export default Footer;
