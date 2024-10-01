const assert = require('node:assert');
const { mitt } = require('../../dist/commonjs/polyfills/mitt-module.js');

assert.equal(typeof mitt, 'function');
