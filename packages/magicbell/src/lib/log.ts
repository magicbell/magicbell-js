const colors = {
  reset: '\x1b[0m',
  magenta: '\x1b[35m',
};

export function emitWarning(message) {
  if (typeof process.emitWarning !== 'function') {
    return console.warn(`magicbell: ${message}`);
  }

  return process.emitWarning(message, 'magicbell');
}

export class Logger {
  active = false;

  debug(message) {
    if (!this.active) return;

    // eslint-disable-next-line no-console
    console.log(`${colors.reset}${colors.magenta}magicbell:${colors.reset} ${message}`);
  }
}
