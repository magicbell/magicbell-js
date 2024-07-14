import { html } from 'lit';

import MagicBellElement from '../mb-element.js';
import { componentStyles, iconStyles } from '../styles.js';

export default class MbIconBell extends MagicBellElement {
  static override styles = [componentStyles, iconStyles];

  override render() {
    return html`
      <svg
        viewBox="0 0 24 24"
        width="15"
        height="15"
        stroke="currentColor"
        stroke-width="2"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
        <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
      </svg>
    `;
  }
}

MbIconBell.define('mb-icon-bell');

declare global {
  interface HTMLElementTagNameMap {
    'mb-icon-bell': MbIconBell;
  }
}
