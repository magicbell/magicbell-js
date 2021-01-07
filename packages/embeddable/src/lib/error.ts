import axios from 'axios';
import * as ErrorStackParser from 'error-stack-parser';
import { ErrorInfo } from 'react';

type Person = Partial<{ id: string }>;
type Context = Partial<{ apiKey: string; userKey: string; userExternalId: string }>;

abstract class MonitoredError {
  token = 'a15f88d968da40f6bcbdfc8187cd0b2a';

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

export class ReactError extends MonitoredError {
  error: Error;
  errorInfo: ErrorInfo;
  person?: Person;
  context?: Context;

  constructor(error: Error, errorInfo: ErrorInfo, person?: Person, context?: Context) {
    super();

    this.error = error;
    this.errorInfo = errorInfo;
    this.person = person;
    this.context = context;
  }

  report() {
    const stack = this.getErrorStack(this.error, this.errorInfo);
    const occurrence = this.buildErrorOcurrece(this.error, stack, this.person, this.context);

    this.storeOccurrence(occurrence);
  }

  private getErrorStack(error: Error, errorInfo: ErrorInfo) {
    const errorContext = new Error(errorInfo.componentStack);
    return [...ErrorStackParser.parse(errorContext), ...ErrorStackParser.parse(error)].reverse();
  }
}

export class UnhandledError extends MonitoredError {
  error;

  /**
   *
   * @param error Error object
   */
  constructor(error) {
    super();
    this.error = error;
  }

  report() {
    const stack = this.getErrorStack(this.error);
    const occurrence = this.buildErrorOcurrece(this.error, stack);
    this.storeOccurrence(occurrence);
  }

  private getErrorStack(error) {
    return [...ErrorStackParser.parse(error)].reverse();
  }
}
