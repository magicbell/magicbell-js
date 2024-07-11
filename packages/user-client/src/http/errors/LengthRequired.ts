import { BaseHTTPError } from './base';

export default class LengthRequired extends BaseHTTPError {
  statusCode = 411;

  title = 'LengthRequired';

  constructor(detail = '') {
    super(detail);
  }
}
