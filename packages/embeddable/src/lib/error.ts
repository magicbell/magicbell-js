/* eslint-disable @typescript-eslint/ban-ts-comment */
import axios from 'axios';
import * as ErrorStackParser from 'error-stack-parser';
import { ErrorInfo } from 'react';

type Person = Partial<{ id: string }>;
type Context = Partial<{ apiKey: string }>;

/**
 * Report an error to rollbar.
 *
 * @param error
 * @param errorInfo
 * @param userId
 * @param apiKey
 */
export function reportReactError(
  error: Error,
  errorInfo: ErrorInfo,
  context: Partial<{ userId: string; apiKey: string }> = {},
) {
  const stack = [
    ...ErrorStackParser.parse(new Error(errorInfo.componentStack)),
    ...ErrorStackParser.parse(error),
  ].reverse();
  const { userId, ...env } = context;

  const person = { id: userId };
  const occurrence = buildErrorOcurrece(error, stack, person, env);
  notifyError(occurrence);
}

function buildErrorOcurrece(error, stack, person: Person, context: Context) {
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

function notifyError(data) {
  const token = 'a15f88d968da40f6bcbdfc8187cd0b2a';
  axios.post('https://api.rollbar.com/api/1/item/', { data }, { headers: { 'X-Rollbar-Access-Token': token } });
}
