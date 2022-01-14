import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  *, html {
    margin: 0;
    padding: 0;
    font-size: ${({ theme }) => theme.font.size.md};
    font-weight: ${({ theme }) => theme.font.weight.normal};
    box-sizing: border-box;
  }
  body {
    background-color: ${(props) => props.theme.colors.bg};
  }
  h1, h2, h3, h4, h5, h6, button {
    margin: 0;
    padding: 0;
  }
`;
