/* eslint-disable @typescript-eslint/ban-ts-comment */
import _axios from 'axios';

// @ts-ignore
export const axios = _axios as unknown as typeof _axios.default;
