import type { PropertyValues } from '@lit/reactive-element';
import { type CSSResultGroup, css, html } from 'lit';
import { property, state } from 'lit/decorators.js';

import MagicBellElement from './internal/mb-element.js';
import { componentStyles } from './internal/styles.js';
import MbSpinner from './mb-spinner.js';

const buttonStyles = css`
  :host {
    position: relative;

    --padding: var(--mb-spacing-x-small) var(--mb-spacing-medium);
  }

  /* Bump focused up so their focus ring isn't clipped */
  :host([data-hover]) {
    z-index: 1;
  }

  /* Focus and checked are always on top */
  :host([data-focus]),
  :host([data-sl-button-group__button][checked]) {
    z-index: 2;
  }

  button {
    --background-color: var(--mb-color-primary);
    background: transparent;
    color: var(--mb-color-text-on-primary);
    padding: var(--padding);
    border: none;
    border-radius: var(--mb-border-radius-medium);
    display: inline-grid;
    align-items: center;
    justify-content: center;
    grid-template-columns: auto;
    transition: opacity var(--mb-transition-fast) ease;
    overflow: hidden;
    font-size: var(--mb-button-font-size-medium);
    position: relative;
    user-select: none;
    cursor: pointer;
  }

  /* apply background to a 'before' element, so we can apply bg opacity on hover */
  button::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--background-color);
    transition: opacity var(--mb-transition-fast), background-color var(--mb-transition-fast);
  }

  button:disabled {
    opacity: 0.5;
    pointer-events: none;
    cursor: default;
  }

  button:hover::before {
    opacity: 0.9;
  }

  button:active::before {
    opacity: 0.85;
  }

  button:active {
    opacity: 0.8;
  }

  button:focus-visible {
    outline: var(--mb-focus-ring);
    outline-offset: var(--mb-focus-ring-offset);
  }

  button > slot {
    grid-area: 1 / 1 / -1 / -1;
    transform: translateY(0);
    transition: opacity var(--mb-transition-fast) ease, transform var(--mb-transition-fast) ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--mb-spacing-x-small);
  }

  button ::slotted(*) {
    display: inline-flex;
    align-items: center;
  }

  button[data-state='success'] {
    --background-color: var(--mb-color-success);
  }

  button[data-state='error'] {
    --background-color: var(--mb-color-danger);
  }

  button slot:not([aria-hidden='false']) {
    opacity: 1;
    transform: translateY(0);
  }

  button slot[aria-hidden='true'] {
    opacity: 0;
    transform: translateY(var(--mb-button-translate-y, 75%));
  }
`;

/**
 * @summary MagicBell Button
 * @documentation https://magicbell.com
 * @status stable
 * @since 1.0
 *
 * @dependency mb-spinner
 *
 * @event mb-focus - Emitted when the button gains focus.
 * @event mb-blur - Emitted when the button loses focus.
 * @event mb-hover - Emitted when a pointer enters or exits the button.
 *
 * @slot [default] - The button's label.
 * @slot pending - The button's label when in pending state, defaults to a spinner.
 * @slot success - The button's label when in success state, defaults to 'success'.
 * @slot error - The button's label when in error state, defaults to 'error'.
 *
 * @csspart button - The button element.
 * @csspart pending-label - The container that wraps the spinner or pending label.
 * @csspart success-label - The container that wraps the success label.
 * @csspart error-label - The container that wraps the error label.
 */
export default class MbButton extends MagicBellElement {
  static override styles: CSSResultGroup = [componentStyles, buttonStyles];

  static override dependencies = {
    'mb-spinner': MbSpinner,
  };

  @property({ type: Boolean, reflect: true, attribute: 'noreset' })
  noReset = false;

  @property({ type: Boolean, reflect: true, attribute: 'data-focus' })
  hasFocus = false;

  @property({ type: Boolean, reflect: true, attribute: 'data-hover' })
  isHovering = false;

  @property({ type: Boolean, reflect: true, attribute: 'disabled' })
  disabled = false;

  /** A custom label to show in button on success. */
  @property({ attribute: 'success-label' })
  successLabel = '';

  /** A custom label to show in the button on error. */
  @property({ attribute: 'error-label' })
  errorLabel = '';

  /** A custom label tos how in the button while pending */
  @property({ attribute: 'pending-label' })
  pendingLabel = '';

  private __state: 'idle' | 'pending' | 'success' | 'error' = 'idle';

  @state()
  set _state(val: typeof this.__state) {
    if (this.__state === val) return;

    clearTimeout(this._timer);
    this.__state = val;

    if (this.noReset) return;
    if (val !== 'success' && val !== 'error') return;

    this._timer = setTimeout(
      () => {
        this.__state = 'idle';
        this.requestUpdate('_state');
      },
      val === 'error' ? 3_000 : 1_500,
    );
  }

  get _state() {
    return this.__state;
  }

  // TS2322: Type 'undefined' is not assignable to type 'Timeout'.
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  private _timer: ReturnType<typeof setTimeout> = undefined!;

  override updated(changedProperties: PropertyValues) {
    if (changedProperties.has('noReset')) {
      if (this._state === 'success' && !this.noReset) {
        this._state = 'idle';
      }
    }
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    clearTimeout(this._timer);
  }

  protected _handleFocus() {
    this.hasFocus = true;
    this.emit('mb-focus');
  }

  protected _handleBlur() {
    this.hasFocus = false;
    this.emit('mb-focus');
  }

  protected _handleMouseOver() {
    this.isHovering = true;
    this.emit('mb-hover', { detail: { value: 0, phase: 'start' } });
  }

  protected _handleMouseOut() {
    this.isHovering = false;
    this.emit('mb-hover', { detail: { value: 0, phase: 'end' } });
  }

  handleClick() {
    if (this._state !== 'idle') return;

    this._state = 'pending';
    this._timer = setTimeout(() => {
      const state = Math.random() > 0.5 ? 'success' : 'error';
      this._state = state;

      if (state === 'success' && this.noReset) return;

      this._timer = setTimeout(
        () => {
          this._state = 'idle';
        },
        state === 'error' ? 5_000 : 1_500,
      );
    }, 1_500);
  }

  override render() {
    return html`
      <button
        part="button"
        data-state=${this._state}
        ?disabled=${this.disabled}
        @click=${this.handleClick}
        @focusout=${this._handleBlur}
        @focusin=${this._handleFocus}
        @mouseover=${this._handleMouseOver}
        @mouseout=${this._handleMouseOut}
      >
        <slot part="label" aria-hidden=${this._state !== 'idle'}>subscribe</slot>
        <slot part="pending-label" name="pending" aria-hidden=${this._state !== 'pending'}
          ><mb-spinner></mb-spinner
        ></slot>
        <slot part="success-label" name="success" aria-hidden=${this._state !== 'success'}>success</slot>
        <slot part="error-label" name="error" aria-hidden=${this._state !== 'error'}>error</slot>
      </button>
    `;
  }
}

MbButton.define('mb-button');

declare global {
  interface HTMLElementTagNameMap {
    'mb-button': MbButton;
  }

  namespace JSX {
    interface IntrinsicElements {
      'mb-button': any;
    }
  }
}
