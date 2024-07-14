import { assert, expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import Spinner from '../dist/mb-spinner.js';

suite('mb-spinner', () => {
  test('is defined', () => {
    const el = document.createElement('mb-spinner');
    assert.instanceOf(el, Spinner);
  });

  test('renders a spinning circle', async () => {
    const el = await fixture(html`<mb-spinner></mb-spinner>`);
    assert.instanceOf(el, Spinner);

    const svg = el.shadowRoot!.querySelector('svg');
    expect(svg).to.be.exist;
  });

  test('styling applied', async () => {
    const el = (await fixture(html`<mb-spinner></mb-spinner>`)) as Spinner;
    await el.updateComplete;

    const hostStyle = getComputedStyle(el);
    assert.equal(hostStyle.position, 'static');
    assert.equal(hostStyle.display, 'inline-flex');

    const svg = el.shadowRoot!.querySelector('svg')!;
    const style = getComputedStyle(svg);
    assert.equal(style.display, 'block');
    assert.equal(style.animation, '0.6s linear 0s infinite normal none running spin');
  });
});
