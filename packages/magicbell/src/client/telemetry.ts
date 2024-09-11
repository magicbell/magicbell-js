import type { Hooks, NormalizedOptions } from 'ky';

import { ClientOptions } from './types.js';

type Telemetry = { id: string; runtime: number; duration: number; status: number };

const history: Telemetry[] = [];
let enabled = true;

function trackRequest(request: Request) {
  (request as any).startTime = Date.now();
  const record = history.pop();

  // we still track response time locally, so we can print it in the console
  if (!record || !enabled) return;
  request.headers.set('x-magicbell-client-telemetry', JSON.stringify(record));
}

function captureResponse(request: Request, option: NormalizedOptions, response?: Response) {
  if (!response?.status) return;

  const { startTime } = request as any;
  if (!startTime) return;

  history.push({
    id: response.headers.get('x-request-id'),
    runtime: Number(response.headers.get('x-runtime')),
    duration: Date.now() - startTime,
    status: response.status,
  });

  // returning is a must, otherwise node keeps hanging on the unused response (clone)
  // see: https://github.com/sindresorhus/ky-universal/issues/46#issuecomment-1620553766
  return response;
}

export function withRequestTelemetry(options: ClientOptions): Hooks {
  enabled = options.telemetry !== false;

  return {
    beforeRequest: [trackRequest],
    afterResponse: [captureResponse],
  };
}
