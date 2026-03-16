/* styles.js  */
import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`

    :root {
    --color-background: #F0F4F8;
    --color-primary: #7BBFDF;
    --color-accent: #7D4E8C;
    --color-text: #2D3748;
    --color-button-text: #ffffff;
    --color-success: #2d6a4f;
    --color-success-bg: #d8f3dc;
    --color-error: #92400e;
    --color-error-bg: #fef3c7;
    --color-severity-low: #52b788;
    --color-severity-medium: #e0a800;
    --color-severity-high: #5b6bb5;
    --color-severity-critical: #6d326d;
    --font-family: 'Inter', system-ui, sans-serif;
    --font-weight-regular: 400;
    --font-weight-medium: 500;
    --font-weight-semibold: 600;

    --gap: 8px;
  }

    *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body {
  height: 100%;
  }

  body {
    font-family: var(--font-family);
    font-weight: var(--font-weight-regular);
    background-color: var(--color-background);
    color: var(--color-text);
    line-height: 1.6;
    min-height: 100dvh;
    padding: 24px;
    padding-bottom: 48px;
  }
`;
