import { html } from 'lit';
import { property } from 'lit/decorators.js';

import MbIconBell from './icons/mb-icon-bell.js';
import MbIconBellOff from './icons/mb-icon-bell-off.js';
import MbIconCheck from './icons/mb-icon-check.js';
import MbIconCross from './icons/mb-icon-cross.js';
import { isSupported, WebPushClient } from './internal/webpush.js';
import MbButton from './mb-button.js';
import MbSpinner from './mb-spinner.js';

/**
 * @summary MagicBell WebPushButton
 */
export default class MbWebPushButton extends MbButton {
  static override styles = [MbButton.styles];

  static override dependencies = {
    'mb-button': MbButton,
    'mb-icon-bell': MbIconBell,
    'mb-icon-bell-off': MbIconBellOff,
    'mb-spinner': MbSpinner,
    'mb-icon-cross': MbIconCross,
    'mb-icon-check': MbIconCheck,
  };

  private _client: WebPushClient;

  @property({ type: String, attribute: 'access-token' })
  accessToken = '';

  @property({ type: Boolean, reflect: true, attribute: 'subscribed' })
  isSubscribed = false;

  @property({ type: Boolean, reflect: true, attribute: 'unsupported' })
  isUnsupported = false;

  @property({ type: Boolean, reflect: true, attribute: 'skip-success' })
  skipSuccess = false;

  constructor() {
    super();

    this._client = new WebPushClient();
  }

  override connectedCallback() {
    super.connectedCallback();

    this._client.isSubscribed().then((subscribed) => {
      this.isSubscribed = subscribed;
    });

    this.isUnsupported = !isSupported();
    this.disabled = this.disabled || this.isUnsupported;
  }

  override attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === 'access-token' && newValue && oldValue !== newValue) {
      this.accessToken = newValue;
      this._client.setAccessToken(newValue);
      this.removeAttribute('access-token');
    }
  }

  override async handleClick() {
    if (this._state !== 'idle') return;

    try {
      this._state = 'pending';

      if (this.isSubscribed) {
        await this._client.unsubscribe();
        this.isSubscribed = false;
      } else {
        await this._client.subscribe();
        this.isSubscribed = true;
      }

      this._state = this.skipSuccess ? 'idle' : 'success';
    } catch (err) {
      this._state = 'error';
    }
  }

  override render() {
    return html`
      <button
        part="button"
        data-status=${this.isSubscribed ? 'subscribed' : 'unsubscribed'}
        data-state=${this._state}
        ?disabled=${this.disabled}
        @click=${this.handleClick}
        @focusout=${this._handleBlur}
        @focusin=${this._handleFocus}
        @mouseover=${this._handleMouseOver}
        @mouseout=${this._handleMouseOut}
      >
        <slot part="subscribe-label" name="subscribe-label" aria-hidden=${this._state !== 'idle' || this.isSubscribed}>
          <mb-icon-bell></mb-icon-bell>
          <span>subscribe</span>
        </slot>
        <slot
          part="unsubscribe-label"
          name="unsubscribe-label"
          aria-hidden=${this._state !== 'idle' || !this.isSubscribed}
        >
          <mb-icon-bell-off></mb-icon-bell-off>
          <span>unsubscribe</span>
        </slot>
        <slot part="pending-label" name="pending-label" aria-hidden=${this._state !== 'pending'}>
          <mb-spinner></mb-spinner>
        </slot>
        <slot part="success-label" name="success-label" aria-hidden=${this._state !== 'success'}>
          <mb-icon-check></mb-icon-check>
        </slot>
        <slot part="error-label" name="error-label" aria-hidden=${this._state !== 'error'}>please, try again</slot>
      </button>
    `;
  }
}

MbWebPushButton.define('mb-webpush-button');

declare global {
  interface HTMLElementTagNameMap {
    'mb-webpush-button': MbWebPushButton;
  }

  namespace JSX {
    interface IntrinsicElements {
      'mb-webpush-button': any;
    }
  }
}
