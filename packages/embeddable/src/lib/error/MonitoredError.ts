import axios from 'axios';

export type Person = Partial<{ id: string }>;
export type Context = Partial<{ apiKey: string; userKey: string; userExternalId: string }>;

export default abstract class MonitoredError {
  token = '7ebe517baa624c3e9dfdbb3c294698f6';

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
          code_version: process.env.VERSION,
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
