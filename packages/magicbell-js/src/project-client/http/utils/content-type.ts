import { ContentType } from '../types.js';

/**
 * Determines the ContentType enum value from a MIME type string.
 * Maps HTTP Content-Type header values to the SDK's ContentType enum.
 * Handles special cases like text/json (parsed as JSON), image/svg+xml (text), and wildcards.
 * @param contentType - The Content-Type header value (e.g., "application/json", "text/plain")
 * @returns The corresponding ContentType enum value
 */
export function getContentTypeDefinition(contentType: string): ContentType {
  const ct = contentType.toLowerCase();

  if (ct.startsWith('application/') && ct.includes('xml')) {
    return ContentType.Xml;
  }

  if (ct === 'application/x-www-form-urlencoded') {
    return ContentType.FormUrlEncoded;
  }

  if (ct === 'text/event-stream') {
    return ContentType.EventStream;
  }

  // Check for JSON content types (including text/json) before text types
  if (ct === 'application/json' || ct === 'text/json' || ct.includes('+json')) {
    return ContentType.Json;
  }

  if (ct === 'application/javascript') {
    return ContentType.Text;
  }

  if (ct.startsWith('text/')) {
    return ContentType.Text;
  }

  // SVG is text-based XML, not binary
  if (ct === 'image/svg+xml') {
    return ContentType.Text;
  }

  if (ct.startsWith('image/')) {
    return ContentType.Image;
  }

  if (ct === 'application/octet-stream' || ct === 'application/pdf') {
    return ContentType.Binary;
  }

  // Wildcard content type
  if (ct === '*/*') {
    return ContentType.Binary;
  }

  return ContentType.Binary;
}
