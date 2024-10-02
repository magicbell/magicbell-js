import assert from 'node:assert';
import { InfiniteScroll } from '../../dist/commonjs/polyfills/infinite-scroll-module.js';
import { Tippy } from '../../dist/esm/polyfills/tippy-module.js';

assert.equal(typeof InfiniteScroll, 'function');
assert.equal(typeof InfiniteScroll.getDerivedStateFromProps, 'function');

assert.equal(typeof Tippy, 'function');
assert.equal(typeof Tippy.defaultProps, 'object');
