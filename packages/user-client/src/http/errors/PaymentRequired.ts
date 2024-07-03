import { BaseHTTPError } from './base';

export default class PaymentRequired extends BaseHTTPError {
  statusCode = 402;

  title = 'Payment Required';

  constructor(detail = '') {
    super(detail);
  }
}
