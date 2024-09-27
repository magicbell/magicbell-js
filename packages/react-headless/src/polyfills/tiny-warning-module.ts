/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createRequire } from 'module';

// @ts-ignore
const require = createRequire(import.meta.url);
export const warning = require('tiny-warning');
