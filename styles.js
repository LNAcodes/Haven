/* styles.js  */
import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`

    :root {
    --color-background: #F0F4F8;
    --color-primary: #7BBFDF;
    --color-accent: #7D4E8C;
    --color-text: #2D3748;
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

  body {
    font-family: var(--font-family);
    font-weight: var(--font-weight-regular);
    background-color: var(--color-background);
    color: var(--color-text);
    line-height: 1.6;
    min-height: 100vh;
  }
`;
