import { z } from 'zod';

export enum ChannelsChannel1 {
  IN_APP = 'in_app',
  SLACK = 'slack',
  WEB_PUSH = 'web_push',
  MOBILE_PUSH = 'mobile_push',
  TEAMS = 'teams',
  EMAIL = 'email',
  SMS = 'sms',
}
