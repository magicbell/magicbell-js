import type { Broadcast } from 'magicbell-js/project-client';
import type { Notification } from 'magicbell-js/user-client';
import { z } from 'zod';

import { HttpClient } from '../dist/esm/project-client/http/client.js';
import { RequestBuilder } from '../dist/esm/project-client/http/transport/request-builder.js';
import { ContentType, HttpResponse } from '../dist/esm/project-client/http/types.js';
import { HttpClient as UserHttpClient } from '../dist/esm/user-client/http/client.js';
import { RequestBuilder as UserRequestBuilder } from '../dist/esm/user-client/http/transport/request-builder.js';
import { ContentType as UserContentType } from '../dist/esm/user-client/http/types.js';

type IsAny<T> = 0 extends 1 & T ? true : false;
type Assert<T extends true> = T;
type _BroadcastTitle = Assert<IsAny<Broadcast['title']> extends false ? true : false>;
type _NotificationId = Assert<IsAny<Notification['id']> extends false ? true : false>;

declare const notification: Omit<Notification, 'readAt'> & { readAt: Date | null };
const identifiable: { id: string } = notification;

const client = new HttpClient({ token: 'test-token' });
const request = new RequestBuilder()
  .addResponse({ schema: z.string().transform((value) => value.length), contentType: ContentType.Json, status: 200 })
  .setPath('/length')
  .build();
const response: Promise<HttpResponse<number>> = client.call(request);
const stream: AsyncGenerator<HttpResponse<number>> = client.stream(request);
// @ts-expect-error The declared response must match the schema's output.
client.call<string>(request);
// @ts-expect-error Streaming must preserve the same schema output.
client.stream<string>(request);

const userClient = new UserHttpClient({ token: 'test-token' });
const userRequest = new UserRequestBuilder()
  .addResponse({ schema: z.number(), contentType: UserContentType.Json, status: 200 })
  .addResponse({ schema: z.undefined(), contentType: UserContentType.NoContent, status: 204 })
  .build();
const userResponse: Promise<HttpResponse<number | undefined>> = userClient.call(userRequest.copy());
// @ts-expect-error Response matching cannot turn either schema's output into a string.
userClient.call<string>(userRequest);
