import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
 */
export const fcmConfigPayload = z.lazy(() => {
  return z.object({
    authProviderX509CertUrl: z.string(),
    authUri: z.string(),
    clientEmail: z.string(),
    clientId: z.string(),
    clientX509CertUrl: z.string(),
    privateKey: z.string().regex(/^-+?\s?BEGIN[A-Z ]+-+\n([A-Za-z0-9+\/\r\n]+={0,2})\n-+\s?END[A-Z ]+-+\n?$/),
    privateKeyId: z.string(),
    projectId: z.string(),
    tokenUri: z.string(),
    type: z.string(),
    universeDomain: z.string(),
  });
});

/**
 *
 * @typedef  {FcmConfigPayload} fcmConfigPayload
 * @property {string}
 * @property {string}
 * @property {string}
 * @property {string}
 * @property {string}
 * @property {string}
 * @property {string}
 * @property {string}
 * @property {string}
 * @property {Type_}
 * @property {string}
 */
export type FcmConfigPayload = z.infer<typeof fcmConfigPayload>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const fcmConfigPayloadResponse = z.lazy(() => {
  return z
    .object({
      auth_provider_x509_cert_url: z.string(),
      auth_uri: z.string(),
      client_email: z.string(),
      client_id: z.string(),
      client_x509_cert_url: z.string(),
      private_key: z.string().regex(/^-+?\s?BEGIN[A-Z ]+-+\n([A-Za-z0-9+\/\r\n]+={0,2})\n-+\s?END[A-Z ]+-+\n?$/),
      private_key_id: z.string(),
      project_id: z.string(),
      token_uri: z.string(),
      type: z.string(),
      universe_domain: z.string(),
    })
    .transform((data) => ({
      authProviderX509CertUrl: data['auth_provider_x509_cert_url'],
      authUri: data['auth_uri'],
      clientEmail: data['client_email'],
      clientId: data['client_id'],
      clientX509CertUrl: data['client_x509_cert_url'],
      privateKey: data['private_key'],
      privateKeyId: data['private_key_id'],
      projectId: data['project_id'],
      tokenUri: data['token_uri'],
      type: data['type'],
      universeDomain: data['universe_domain'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const fcmConfigPayloadRequest = z.lazy(() => {
  return z
    .object({
      authProviderX509CertUrl: z.string(),
      authUri: z.string(),
      clientEmail: z.string(),
      clientId: z.string(),
      clientX509CertUrl: z.string(),
      privateKey: z.string().regex(/^-+?\s?BEGIN[A-Z ]+-+\n([A-Za-z0-9+\/\r\n]+={0,2})\n-+\s?END[A-Z ]+-+\n?$/),
      privateKeyId: z.string(),
      projectId: z.string(),
      tokenUri: z.string(),
      type: z.string(),
      universeDomain: z.string(),
    })
    .transform((data) => ({
      auth_provider_x509_cert_url: data['authProviderX509CertUrl'],
      auth_uri: data['authUri'],
      client_email: data['clientEmail'],
      client_id: data['clientId'],
      client_x509_cert_url: data['clientX509CertUrl'],
      private_key: data['privateKey'],
      private_key_id: data['privateKeyId'],
      project_id: data['projectId'],
      token_uri: data['tokenUri'],
      type: data['type'],
      universe_domain: data['universeDomain'],
    }));
});
