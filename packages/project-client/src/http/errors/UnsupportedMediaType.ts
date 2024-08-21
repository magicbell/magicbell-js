import { BaseHTTPError } from './base';

export default class UnsupportedMediaType extends BaseHTTPError {
  statusCode = 415;

  title = 'Unsupported Media Type';

  constructor(detail = '') {
    super(detail);
  }
}
