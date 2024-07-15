import { html } from 'lit';

import MagicBellElement from '../internal/mb-element.js';
import { componentStyles, iconStyles } from '../internal/styles.js';

export default class MbIconBellOff extends MagicBellElement {
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
        <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
        <path d="M18.63 13A17.89 17.89 0 0 1 18 8"></path>
        <path d="M6.26 6.26A5.86 5.86 0 0 0 6 8c0 7-3 9-3 9h14"></path>
        <path d="M18 8a6 6 0 0 0-9.33-5"></path>
        <line x1="1" y1="1" x2="23" y2="23"></line>
      </svg>
    `;
  }
}

MbIconBellOff.define('mb-icon-bell-off');

declare global {
  interface HTMLElementTagNameMap {
    'mb-icon-bell-off': MbIconBellOff;
  }
}
