import { css } from 'lit';

export const componentStyles = css`
  :host {
    box-sizing: border-box;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }

  [hidden] {
    display: none !important;
  }
`;

export const iconStyles = css`
  :host {
    display: inline-flex;
  }
`;
