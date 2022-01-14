// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      // bg
      bg: string;
      // blue
      primary: string;
      // text
      textPri: string;
      textSec: string;
      // border colors
      inputBorder: string;
      hrBorder: string;
      // hover colors
      hover: string;
      tweetHover: string;
      priHover: string;
      iconHover: string;

      // transparent
      transparent: string;
    };
    transition: string;
  }
}
