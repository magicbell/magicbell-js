import axios from 'axios';

import { pkg } from '../pkg.js';

export type Person = Partial<{ id: string }>;
export type Context = Partial<{ apiKey: string; userKey: string; userExternalId: string }>;

export default abstract class MonitoredError {
  token = '0bf03f4da9d240eeab24c5e1d590b404';

  /**
   * Report an error to the error monitoring service.
   */
  abstract report();

  protected buildErrorOcurrece(error, stack, person?: Person, context?: Context) {
    const environment = process.env.NODE_ENV;
    const title = error.toString();
    const browserInfo = navigator.userAgent;
    const framework = 'react';
    const language = 'javascript';
    const platform = 'browser';

    return {
      environment,
      title,
      client: {
        javascript: {
          browser: browserInfo,
          code_version: pkg.gitHash,
        },
      },
      person,
      custom: context,
      framework,
      language,
      platform,
      body: {
        trace: {
          frames: stack.map((frame) => ({
            filename: frame.fileName,
            lineno: frame.lineNumber,
            colno: frame.columnNumber,
            method: frame.functionName,
            code: frame.source,
          })),
          exception: {
            class: error.name,
            message: error.message,
          },
        },
      },
    };
  }

  protected storeOccurrence(data) {
    axios
      .post('https://api.rollbar.com/api/1/item/', { data }, { headers: { 'X-Rollbar-Access-Token': this.token } })
      .catch(() => {
        // Silence error
      });
  }
}
