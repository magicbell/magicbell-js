import { ContentType } from '../types.js';

export function getContentTypeDefinition(contentType: string): ContentType {
  if (contentType.startsWith('application/') && contentType.includes('xml')) {
    return ContentType.Xml;
  }

  if (contentType.toLowerCase() === 'application/x-www-form-urlencoded') {
    return ContentType.FormUrlEncoded;
  }

  if (contentType.toLowerCase() === 'text/event-stream') {
    return ContentType.EventStream;
  }

  if (contentType.toLowerCase().startsWith('text/')) {
    return ContentType.Text;
  }

  if (contentType.toLowerCase().startsWith('image/')) {
    return ContentType.Image;
  }

  if (contentType.toLowerCase() === 'application/octet-stream') {
    return ContentType.Binary;
  }

  if (contentType.toLowerCase() === 'application/json') {
    return ContentType.Json;
  }

  return ContentType.Json;
}
