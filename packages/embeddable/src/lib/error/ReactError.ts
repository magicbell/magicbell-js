import * as ErrorStackParser from 'error-stack-parser';
import { ErrorInfo } from 'react';

import MonitoredError, { Context, Person } from './MonitoredError.js';

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
    if (errorInfo) {
      const errorContext = new Error(errorInfo.componentStack);
      return [...ErrorStackParser.parse(errorContext), ...ErrorStackParser.parse(error)].reverse();
    } else {
      return [...ErrorStackParser.parse(error)];
    }
  }
}
