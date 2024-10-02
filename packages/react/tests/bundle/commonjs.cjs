const assert = require('node:assert');
const { InfiniteScroll } = require('../../dist/commonjs/polyfills/infinite-scroll-module.js');
const { Tippy } = require('../../dist/commonjs/polyfills/tippy-module.js');

assert.equal(typeof InfiniteScroll, 'function');
assert.equal(typeof InfiniteScroll.getDerivedStateFromProps, 'function');

assert.equal(typeof Tippy, 'function');
assert.equal(typeof Tippy.defaultProps, 'object');
