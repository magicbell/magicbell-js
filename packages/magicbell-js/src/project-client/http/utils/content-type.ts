import { ContentType } from '../types.js';

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
