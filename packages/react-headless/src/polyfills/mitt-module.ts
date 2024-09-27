/* eslint-disable @typescript-eslint/ban-ts-comment */
import module from 'node:module';

// @ts-ignore
const require = module.createRequire(import.meta.url);
export const mitt = require('mitt');
