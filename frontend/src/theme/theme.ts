import { DefaultTheme } from "styled-components";

const myTheme: DefaultTheme = {
  colors: {
    bg: "rgb(255 255 255)",
    bg2: "rgb(247, 249, 249)",
    primary: "rgb(29, 155, 240)", // blue
    // text
    textPri: "rgb(15, 20, 25)",
    textSec: "rgb(83, 100, 113)",
    // border colors
    inputBorder: "rgb(207, 217, 222)",
    hrBorder: "rgb(239, 243, 244)",
    // hover colors
    hover: "rgba(0, 0, 0, 0.1)", // used in nav link/white button
    priHover: "rgb(26, 140, 216)", // dark blue
    tweetHover: "rgba(0, 0, 0, 0.03)",
    iconHover: "rgba(29, 155, 240, 0.1)",
    // transparent
    transparent: "rgba(0, 0, 0, 0)",
    error: "red",
  },
  transition: "all 0.5s ease",
  borderRadius: "9999px",
  font: {
    size: {
      h1: "64px",
      h2: "31px",
      lg: "20px",
      md: "15px",
      sm: "13px",
    },
    weight: {
      bold: "700",
      normal: "400",
      light: "200",
    },
  },
};

export { myTheme };
