import { themeFactory } from "@milkdown/core";
import { injectGlobal } from "@emotion/css";

function varMap(variable: string) {
  return window
    .getComputedStyle(document.documentElement)
    .getPropertyValue(variable)
    .replace(/\s/g, "");
}

const color = () => {
  return {
    shadow: varMap("--sn-stylekit-shadow-color"),
    primary: varMap("--sn-stylekit-contrast-background-color"),
    secondary: varMap("--sn-stylekit-secondary-contrast-background-color"),
    neutral: varMap("--sn-stylekit-neutral-color"),
    solid: varMap("--sn-stylekit-contrast-background-color"),
    line: varMap("--sn-stylekit-border-color"),
    background: varMap("--sn-stylekit-secondary-background-color"),
    surface: varMap("--sn-stylekit-editor-background-color"),
  };
};

export const sn = themeFactory({
  font: {
    typography: ["var(--sn-stylekit-sans-serif-font)"],
    code: ["var(--sn-stylekit-monospace-font)"],
  },
  size: {
    radius: "var(--sn-stylekit-general-border-radius)",
    lineWidth: "1px",
  },
  color: color(),
  global: ({ palette, font }) => {
    injectGlobal`
      body {
        padding: 0;
        margin: 0;
      }
      .milkdown {
        min-height: 100vh;
        margin-left: auto;
        margin-right: auto;
        box-sizing: border-box;
        position: relative;
        background; ${palette('surface')};
        font-family: ${font.typography};
        color: ${palette('neutral')};
      }
    `
  },
});
