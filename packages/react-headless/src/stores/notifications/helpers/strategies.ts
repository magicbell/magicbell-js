import { isNil } from 'ramda';

import { IRemoteNotification } from '../../../types';
import { IStrategyComparator } from '../../../types/INotificationStore';

function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

function ensureArray(value) {
  return Array.isArray(value) ? value : String(value).split(',');
}

export type NotificationCompareStrategy = (
  notification: IRemoteNotification,
  context: Record<string, unknown>,
  comparator?: IStrategyComparator,
) => { result: boolean; delta: string[] };

/**
 * Check if a notification satisfies all conditions of the given `context`. It
 * Uses equal to compare.
 *
 * @param notification Notification to test
 * @param context Set of rules to test the notification against
 * @param comparator Function used to compare notification attributes and context values
 */
export function objMatchesContext(
  notification: IRemoteNotification,
  context: Record<string, unknown>,
  comparator: IStrategyComparator = eq,
) {
  const diff: string[] = [];

  Object.keys(context).forEach((attr) => {
    const condition = context[attr];

    if (
      (attr === 'read' && !comparator(!isNil(notification.readAt), condition)) ||
      (attr === 'seen' && !comparator(!isNil(notification.seenAt), condition)) ||
      (attr === 'categories' &&
        ensureArray(condition).every((category) => !comparator(notification.category, category))) ||
      (attr === 'topics' && ensureArray(condition).every((topic) => !comparator(notification.topic, topic))) ||
      (Object.hasOwnProperty.call(notification, attr) && !comparator(notification[attr], condition))
    ) {
      diff.push(attr);
    }
  });

  return { result: diff.length === 0, delta: diff };
}
