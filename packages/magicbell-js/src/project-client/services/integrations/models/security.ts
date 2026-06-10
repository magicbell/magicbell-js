import { z } from 'zod';

export enum Security {
  NONE = 'none',
  SSL = 'ssl',
  STARTTLS = 'starttls',
}
