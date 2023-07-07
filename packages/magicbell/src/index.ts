export type { RequestOptions } from './client/types';
export { createHmac } from './crypto';
export { type ProjectClientOptions, ProjectClient } from './project-client';
export { type UserClientOptions, UserClient } from './user-client';

// for backwards compatibility
export { type ProjectClientOptions as ClientOptions, ProjectClient as Client } from './project-client';
export { ProjectClient as default } from './project-client';
