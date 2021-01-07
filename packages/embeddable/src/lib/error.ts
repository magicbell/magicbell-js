import axios from 'axios';
import * as ErrorStackParser from 'error-stack-parser';
import { ErrorInfo } from 'react';

type Person = Partial<{ id: string }>;
type Context = Partial<{ apiKey: string; userKey: string; userExternalId: string }>;

/**
 * Report an error to rollbar.
 *
 * @param error
 * @param errorInfo
 * @param context Context to be included in the report, such as person, project, etc
 */
export function reportReactError(
  error: Error,
  errorInfo: ErrorInfo,
  context: Partial<{ userId: string; apiKey: string }> = {},
) {
  const { userId, ...env } = context;
  const person = { id: userId };
  const stack = getReactErrorStack(error, errorInfo);
  const occurrence = buildErrorOcurrece(error, stack, person, env);

  notifyError(occurrence);
}

/**
 * Report a window error to rollbar
 *
 * @param error Error object
 * @param message Error message
 */
export function reportUnhandledError(error) {
  const stack = getUnhandledErrorStack(error);
  const occurrence = buildErrorOcurrece(error, stack);
  notifyError(occurrence);
}

function getReactErrorStack(error: Error, errorInfo: ErrorInfo) {
  const errorContext = new Error(errorInfo.componentStack);
  return [...ErrorStackParser.parse(errorContext), ...ErrorStackParser.parse(error)].reverse();
}

function getUnhandledErrorStack(error) {
  return [...ErrorStackParser.parse(error)].reverse();
}

function buildErrorOcurrece(error, stack, person?: Person, context?: Context) {
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
  axios
    .post('https://api.rollbar.com/api/1/item/', { data }, { headers: { 'X-Rollbar-Access-Token': token } })
    .catch(() => {
      // Silence error
    });
}
