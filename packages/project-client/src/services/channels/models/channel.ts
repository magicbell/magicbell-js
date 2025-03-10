import { z } from 'zod';

export enum Channel {
  IN_APP = 'in_app',
  SLACK = 'slack',
  WEB_PUSH = 'web_push',
  MOBILE_PUSH = 'mobile_push',
  TEAMS = 'teams',
  EMAIL = 'email',
  SMS = 'sms',
}
