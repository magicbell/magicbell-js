import { BaseHTTPError } from './base';

export default class MethodNotAllowed extends BaseHTTPError {
  statusCode = 405;

  title = 'Method Not Allowed';

  allow?: string[];

  constructor(detail = '', allow?: string[]) {
    super(detail);
    this.allow = allow;
  }
}
