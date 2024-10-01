import assert from 'node:assert';
import { mitt } from '../../dist/esm/polyfills/mitt-module.js';

assert.equal(typeof mitt, 'function');
