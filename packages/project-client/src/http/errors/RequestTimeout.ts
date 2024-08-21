import { BaseHTTPError } from './base';

export default class RequestTimeout extends BaseHTTPError {
  statusCode = 408;

  title = 'Request Timeout';

  constructor(detail = '') {
    super(detail);
  }
}
