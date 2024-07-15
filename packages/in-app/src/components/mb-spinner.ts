import { css, html } from 'lit';

import MagicBellElement from './internal/mb-element.js';
import { componentStyles } from './internal/styles.js';

const spinnerStyles = css`
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  :host {
    justify-content: center;
    justify-items: center;
    display: inline-flex;
  }

  svg {
    animation: spin 0.6s linear infinite;
  }
`;

export default class MbSpinner extends MagicBellElement {
  static override styles = [componentStyles, spinnerStyles];

  override render() {
    return html`
      <svg viewBox="0 0 24 24" width="15" height="15">
        <g transform="translate(1 1)" fill-rule="nonzero" fill="none">
          <circle cx="11" cy="11" r="11" />
          <path
            d="M10.998 22a.846.846 0 0 1 0-1.692 9.308 9.308 0 0 0 0-18.616 9.286 9.286 0 0 0-7.205 3.416.846.846 0 1 1-1.31-1.072A10.978 10.978 0 0 1 10.998 0c6.075 0 11 4.925 11 11s-4.925 11-11 11z"
            fill="currentColor"
          />
        </g>
      </svg>
    `;
  }
}

MbSpinner.define('mb-spinner');

declare global {
  interface HTMLElementTagNameMap {
    'mb-spinner': MbSpinner;
  }
}
