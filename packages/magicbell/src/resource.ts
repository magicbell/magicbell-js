import { Client } from './client';

export class Resource {
  path: string;
  entity: string;

  client: InstanceType<typeof Client>;

  constructor(client: InstanceType<typeof Client>) {
    this.client = client;
  }
}
