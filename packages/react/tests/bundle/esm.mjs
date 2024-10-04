import assert from 'node:assert';
import { InfiniteScroll } from '../../dist/commonjs/polyfills/infinite-scroll-module.js';

assert.equal(typeof InfiniteScroll, 'function');
assert.equal(typeof InfiniteScroll.getDerivedStateFromProps, 'function');
