import { createGlobalStyle, css } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    font-family: "Rubik", sans-serif;
    max-inline-size: var(--measure);
  }

  html,
  body,
  div,
  header,
  nav,
  main,
  footer {
    max-inline-size: none;
  }

  div {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  img {
    max-inline-size: 100%;
  }

  #root{ 
    height: inherit;
    width: inherit;
  }
  :root {
    --measure: 70ch;
    --ratio: 1.5;
    --border-thin: 2px;
    --border-radius: 16px;
    --s-5: calc(var(--s-4) / var(--ratio));
    --s-4: calc(var(--s-3) / var(--ratio));
    --s-3: calc(var(--s-2) / var(--ratio));
    --s-2: calc(var(--s-1) / var(--ratio));
    --s-1: calc(var(--s0) / var(--ratio));
    --s0: 1em;
    --s1: calc(var(--s0) * var(--ratio));
    --s2: calc(var(--s1) * var(--ratio));
    --s3: calc(var(--s2) * var(--ratio));
    --s4: calc(var(--s3) * var(--ratio));
    --s5: calc(var(--s4) * var(--ratio));
    ${(props) => css`
        --border-color: ${props.theme.colors.ui.borderColor};
        --background-color: ${props.theme.colors.bg.primary};
        --text-color: ${props.theme.colors.text.primary};
    `}
    font-size: calc(var(--s0) + 0.618vw);
  }

  .body {
    background-color: ${(props) => props.theme.colors.bg.primary};
    color: ${(props) => props.theme.colors.text.primary};
    height: 100vh;
    width: 100vw;
    margin: 0;
  }

  .column {
    flex-basis: 30%;
    border-right: var(--border-color) solid;
  }

  .column:last-child {
    flex-basis: 40%;
    border-right: none;
  }

  .icon {
    height: 0.75em;
    height: 1cap;
    width: 0.75em;
    width: 1cap;
  }

  .with-icon {
    display: inline-flex;
    align-items: center;
  }

  .with-icon .icon {
    margin-inline-end: var(--space, 0.5em);
  }

  .db {
    background-color: ${(props) => props.theme.colors.bg.secondary};
  }

  .db-content {
    display: flex;
    flex: 1;
    height: calc(100vh - 2 * var(--s-1) - 2 * var(--border-thin));
  }

  .add {
    color: #2454FF;
  }

  .add-container {
    cursor: pointer;
  }

  .add-container:hover {
    background: rgba(36, 84, 255, 0.1);
  }

  .header {
    background: ${(props) => props.theme.colors.bg.tertiary};
  }

  .row {
    cursor: pointer;
  }

  .row:hover {
    background: ${(props) => props.theme.colors.bg.tertiary};
  }

  .row-item {
    margin-left: var(--s1);
  }
`

export default { GlobalStyle }
