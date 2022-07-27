import { css } from '@emotion/react';

import { useTheme } from '../../context/MagicBellThemeContext';

export function useProse() {
  const { prose } = useTheme();

  // double && to make sure that it's more specific than the cleanslate
  return css`
    && {
      line-height: 1.75;
    }

    && p {
      margin: 1.25em 0;
    }

    && a {
      color: ${prose.links} !important;
      user-select: none;

      text-decoration: underline;
      &:hover {
        text-decoration: none;
      }
    }

    && button,
    && a.button {
      display: inline-block;
      color: ${prose.buttons};
      font-size: 0.875em !important;
      font-family: inherit;
      border: 1px solid ${prose.buttonBorders};
      border-radius: 0.375rem;
      padding: 0.5em 0.85em;
      line-height: inherit;
      background-color: transparent;
      background-image: none;
      text-decoration: none;
      user-select: none;

      &:hover,
      &:focus {
        opacity: 0.75;
      }

      &:active {
        opacity: 0.5;
      }
    }

    && button + button {
      margin-left: 0.5em;
    }

    && strong,
    && b {
      color: ${prose.bold} !important;
      font-weight: 600 !important;
    }

    && ol,
    && ul {
      margin: 1.25em 0;
    }

    && ol {
      list-style: decimal;
    }

    && ul {
      list-style: disc;
    }

    && li {
      margin: 0.5em 0 0 2em;
    }

    && hr {
      border: none;
      border-top: 1px solid ${prose.hr};
      margin: 3em 0;
      height: 0;
      color: inherit;
    }

    && blockquote {
      font-weight: 500;
      font-style: italic;
      color: ${prose.quotes};
      border-left: 0.25rem solid ${prose.quoteBorders};
      quotes: '“' '”';
      margin: 1.6em 0;
      padding-left: 1em;
    }

    && blockquote p:first-child::before {
      content: open-quote;
    }

    && blockquote p:last-of-type::after {
      content: close-quote;
    }

    && h1 {
      color: ${prose.headings};
      font-weight: 800;
      font-size: 2.25em;
      margin: 0 0 0.9em 0;
      line-height: 1.1111111;
    }

    && h2 {
      color: ${prose.headings};
      font-weight: 700;
      font-size: 1.5em;
      margin: 2em 0 1em 0;
      line-height: 1.3333333;
    }

    && h3 {
      color: ${prose.headings};
      font-weight: 600;
      font-size: 1.25em;
      margin: 1.6em 0 0.6em 0;
      line-height: 1.6;
    }

    && h4,
    && h5,
    && h6 {
      color: ${prose.headings};
      font-weight: 600;
      font-size: 1.1em;
      margin: 1.5em 0 0.5em 0;
      line-height: 1.5;
    }

    && figure figcaption {
      color: ${prose.captions};
      font-size: 0.875em;
      line-height: 1.4285714;
      margin: 0.85em 0 0 0;
    }

    && code {
      color: ${prose.code};
      font-weight: 600;
      font-size: 0.875em;
      font-family: ${prose.fontMono};
    }

    && code::before {
      content: '\`';
    }

    && code::after {
      content: '\`';
    }

    && pre {
      color: ${prose.preCode};
      background-color: ${prose.preBg};
      overflow-x: auto;
      font-size: 0.875em;
      font-family: ${prose.fontMono};
      line-height: 1.7142857;
      margin: 1.7em 0;
      border-radius: 0.375rem;
      padding: 0.85em 1.14em;
    }

    && pre code {
      background-color: transparent;
      border-width: 0;
      border-radius: 0;
      padding: 0;
      font-weight: 400;
      color: inherit;
      font-size: inherit;
      font-family: inherit;
      line-height: inherit;
    }

    && pre code::before {
      content: '';
    }

    && pre code::after {
      content: '';
    }

    && table {
      width: 100%;
      table-layout: auto;
      text-align: left;
      margin: 2em 0;
      font-size: 0.875em;
      line-height: 1.7142857;
      border-collapse: collapse;
    }

    && thead th {
      font-weight: 600;
      border-bottom: 1px solid ${prose.thBorders};
      vertical-align: bottom;
      padding: 0 0.5em 0.5em 0.5em;
    }

    && tbody td {
      vertical-align: top;
      padding: 0.5em;
    }

    && tbody tr:not(:last-child) td {
      border-bottom: 1px solid ${prose.tdBorders};
    }

    && img,
    && video,
    && figure {
      margin: 2em 0;
    }

    && figure > * {
      margin: 0;
    }

    && h2 code {
      font-size: 0.875em;
    }

    && h3 code {
      font-size: 0.9em;
    }

    && > ul > li p {
      margin: 0.75em 0;
    }

    && > ul > li > *:first-child,
    && > ol > li > *:first-child {
      margin-top: 1.25em;
    }

    && > ul > li > *:last-child,
    && > ol > li > *:last-child {
      margin-bottom: 1.25em;
    }

    && ul ul,
    && ul ol,
    && ol ul,
    && ol ol {
      margin: 0.75em 0;
    }

    && hr + *,
    && h2 + *,
    && h3 + *,
    && h4 + *,
    && h5 + *,
    && h6 + * {
      margin-top: 0;
    }

    && thead th:first-child,
    && tbody td:first-child {
      padding-left: 0;
    }

    && thead th:last-child,
    && tbody td:last-child {
      padding-right: 0;
    }

    && > :first-child {
      margin-top: 0;
    }

    && > :last-child {
      margin-bottom: 0;
    }
  `;
}
