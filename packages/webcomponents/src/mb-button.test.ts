import { assert, expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import Button from '../dist/mb-button.js';

suite('mb-button', () => {
  test('is defined', () => {
    const el = document.createElement('mb-button');
    assert.instanceOf(el, Button);
  });

  test('renders with default values', async () => {
    const el = await fixture(html`<mb-button></mb-button>`);
    assert.instanceOf(el, Button);

    const button = el.shadowRoot!.querySelector('button');
    expect(button).to.have.attribute('data-state', 'idle');
    expect(button).to.have.attribute('part', 'button');
    expect(button).to.include.text('subscribe');
  });

  test('renders with a set name', async () => {
    const el = await fixture(html`<mb-button>click me</mb-button>`);
    expect(el).shadowDom.to.include.text('click me');
  });

  test('handles a click', async () => {
    const el = await fixture(html`<mb-button></mb-button>`);
    const button = el.shadowRoot!.querySelector('button')! as unknown as Button;
    button.click();
    await button.updateComplete;

    expect(button).to.have.attribute('data-state', 'pending');
    const pendingSlot = el.shadowRoot!.querySelector('slot[name="pending"]')!;
    expect(pendingSlot).to.exist;
    expect(pendingSlot).to.have.attribute('aria-hidden', 'false');
  });

  test('styling applied', async () => {
    const el = (await fixture(html`<mb-button></mb-button>`)) as Button;
    await el.updateComplete;

    assert.equal(getComputedStyle(el).position, 'relative');

    const button = el.shadowRoot!.querySelector('button')!;
    const style = getComputedStyle(button);
    assert.equal(style.position, 'relative');
    assert.equal(style.display, 'inline-grid');
    assert.equal(style.padding, '8px 16px');
  });
});
