const assert = require('node:assert');
const { InfiniteScroll } = require('../../dist/commonjs/polyfills/infinite-scroll-module.js');

assert.equal(typeof InfiniteScroll, 'function');
assert.equal(typeof InfiniteScroll.getDerivedStateFromProps, 'function');
