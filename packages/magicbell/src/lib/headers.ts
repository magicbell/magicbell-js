/**
 * Normalize standard HTTP Headers:
 * {'foo-bar': 'hi'}
 * becomes
 * {'Foo-Bar': 'hi'}
 */
export function normalizeHeaders(headers: Record<string, string>) {
  if (!headers || typeof headers !== 'object') {
    return headers;
  }

  const normalized = {};
  for (const header of Object.keys(headers)) {
    normalized[normalizeHeader(header)] = headers[header];
  }

  return normalized;
}

/**
 * Stolen from https://github.com/marten-de-vries/header-case-normalizer/blob/master/index.js#L36-L41
 * without the exceptions which are irrelevant to us.
 */
function normalizeHeader(header) {
  const exceptions = {
    etag: 'ETag',
    magicbell: 'MagicBell',
  };

  return header
    .split('-')
    .map((text) => exceptions[text.toLowerCase()] || text.charAt(0).toUpperCase() + text.slice(1).toLowerCase())
    .join('-');
}
