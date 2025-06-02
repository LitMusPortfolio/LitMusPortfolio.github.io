import { createGlobalStyle } from "styled-components";
import { theme } from "./theme";

export const GlobalStyles = createGlobalStyle`

  * {
    box-sizing: border-box;
    color: ${theme.colors.text.primary};
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'ZenKaku Gothic New', 'Noto Sans JP', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-weight: 900;
    letter-spacing: 0.06em; /* 字間0.6 = 0.06em */
    background: #000;
    overflow-x: hidden;
    font-size: ${theme.typography.fontSize.base};
  }
  
  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  
  main {
    flex: 1;
    margin-top: 0;
  }

  /* 見出しスタイル - 日本語と英数字で異なるフォント */
  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    font-family: 'Source Han Sans JP', 'Noto Sans JP', sans-serif;
    font-weight: 900;
    letter-spacing: 0.07em; /* 字間0.7 = 0.07em */
    line-height: 1.4;
  }

  h1 {
    font-size: ${theme.typography.fontSize["5xl"]};
  }

  h2 {
    font-size: ${theme.typography.fontSize["3xl"]};
  }

  /* 見出し内の英数字 */
  h1 span[lang="en"], h2 span[lang="en"], h3 span[lang="en"], 
  h4 span[lang="en"], h5 span[lang="en"], h6 span[lang="en"],
  h1 .en, h2 .en, h3 .en, h4 .en, h5 .en, h6 .en {
    font-family: 'Montserrat', sans-serif;
    font-weight: 900;
    letter-spacing: 0.1em; /* 字間1.0 = 0.1em */
  }

  /* 本文スタイル */
  p, div, span, li, td, th {
    font-family: 'ZenKaku Gothic New', 'Noto Sans JP', sans-serif;
    font-weight: 900;
    letter-spacing: 0.06em; /* 字間0.6 = 0.06em */
    line-height: 1.8;
  }

  p {
    margin: 0;
  }

  ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 1em;

    > li {
      display: flex;

      &::before {
        content: "▶";
        margin-right: 0.5em;
        font-size: ${theme.typography.fontSize.xs};
        position: relative;
        top: 0.7em;
      }
    }
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    cursor: pointer;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  /* カスタムスクロールバー */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #111;
  }

  ::-webkit-scrollbar-thumb {
    background: #333;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  /* アニメーション設定 */
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;
