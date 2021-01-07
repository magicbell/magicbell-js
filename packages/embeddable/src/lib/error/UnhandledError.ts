import * as ErrorStackParser from 'error-stack-parser';
import MonitoredError from './MonitoredError';

export class UnhandledError extends MonitoredError {
  error: Error;

  /**
   *
   * @param error Error object
   */
  constructor(error: Error) {
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
