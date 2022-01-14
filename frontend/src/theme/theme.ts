import { DefaultTheme } from "styled-components";

const myTheme: DefaultTheme = {
  colors: {
    bg: "rgb(255 255 255)",
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
  },
  transition: "all 0.5s ease",
};

export { myTheme };
