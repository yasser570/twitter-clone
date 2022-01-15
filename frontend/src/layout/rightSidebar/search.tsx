import React, { useState } from "react";
import styled from "styled-components";

const Input = styled.input`
  outline: none;
  border: none;
  background-color: transparent;
  padding: 12px;
  width: 100%;
  &:focus {
    outline: none;
    border: none;
  }
`;

const Container = styled.div`
  position: sticky;
  top: 0;
  height: 53px;
  background-color: ${({ theme }) => theme.colors.bg};
  padding-bottom: 12px;
  z-index: 5;
`;

const SearchContainer = styled.div`
  width: 100%;
  margin-top: 4px;
  display: flex;
  flex-direction: row;
  background-color: ${({ theme }) => theme.colors.bg2};
  border-radius: ${({ theme }) => theme.borderRadius};
  border: 1px solid ${({ theme }) => theme.colors.bg2};
  transition: ${({ theme }) => theme.transition};
  ${Input}:focus & {
    background-color: ${({ theme }) => theme.colors.bg};
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const SvgContainer = styled.div`
  /* width: 36px; */
  /* height: 36px; */
  padding: 8px 12px;
  color: inherit;
  background-color: ${({ theme }) => theme.colors.transparent};
`;

const StyledSvg = styled.svg`
  width: 20px;
  height: 20px;
  color: inherit;
  fill: currentColor;
`;

const SearchIcon = () => (
  <StyledSvg viewBox="0 0 24 24" aria-hidden="true">
    <g>
      <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
    </g>
  </StyledSvg>
);

const Search: React.FC = () => {
  const [searchQ, setSearchQ] = useState("");
  return (
    <Container>
      <SearchContainer>
        <SvgContainer>
          <SearchIcon />
        </SvgContainer>
        <Input
          type="text"
          value={searchQ}
          onChange={(e) => setSearchQ(e.target.value)}
          placeholder="Search Twitter"
        />
      </SearchContainer>
    </Container>
  );
};

export default Search;
