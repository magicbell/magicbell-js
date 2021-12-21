import { css } from '@emotion/react';

const cleanslate = css`
  backface-visibility: visible;
  background-clip: border-box;
  background-color: transparent;
  background-origin: padding-box;
  background-position: 0 0;
  background-size: auto;
  border-radius: 0;
  border: 0;
  box-shadow: none;
  box-sizing: content-box;
  clear: none;
  clip: auto;
  color: inherit;
  cursor: auto;
  direction: inherit;
  display: block;
  left: auto;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell,
    'Helvetica Neue', sans-serif;
  font-size: 14px;
  font-weight: normal;
  height: auto;
  hyphens: manual;
  letter-spacing: normal;
  line-height: 1;
  margin: 0;
  max-height: none;
  max-width: none;
  min-height: 0;
  min-width: 0;
  opacity: 1;
  outline: invert none medium;
  padding: 0;
  perspective: none;
  position: static;
  right: auto;
  top: auto;
  transform: none;
  text-align: left;
  text-decoration: none;
  vertical-align: baseline;
  visibility: inherit;
  white-space: normal;
  width: auto;
  word-spacing: normal;
  z-index: auto;

  div,
  span,
  p,
  a,
  strong,
  b,
  u,
  i,
  ol,
  ul,
  li,
  form,
  label,
  table,
  tr,
  th,
  td,
  article,
  aside,
  footer,
  header,
  nav,
  section {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }

  a {
    cursor: pointer !important;
    color: inherit !important;
  }

  button {
    background: transparent;
    border: none;
    font-size: inherit !important;
    color: inherit;
    padding: 0;
    cursor: pointer !important;
  }
`;

export default cleanslate;
