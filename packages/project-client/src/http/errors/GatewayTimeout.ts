import { BaseHTTPError } from './base';

export default class GatewayTimeout extends BaseHTTPError {
  statusCode = 504;

  title = 'Gateway Timeout';

  constructor(detail = '') {
    super(detail);
  }
}
