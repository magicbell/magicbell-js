import eq from 'lodash/eq';
import has from 'lodash/has';
import keys from 'lodash/keys';
import { Notification } from '../models';

export type NotificationCompareStrategy = (
  notification: Notification,
  context,
  comparator?: (left, right) => boolean,
) => { result: boolean; delta: string[] };

/**
 * Check if a notification satisfies all conditions of the given `context`. It
 * Uses equal to compare.
 *
 * @param notification Notification to test
 * @param context Set of rules to test the notification against
 * @param comparator Function used to compare notification attributes and context values
 */
export function compareAttributeStrategy(notification: Notification, context, comparator = eq) {
  const diff: string[] = [];

  keys(context).forEach((attr) => {
    const conditionValue = context[attr];

    if (
      (attr === 'read' && !comparator(notification.isRead, conditionValue)) ||
      (attr === 'seen' && !comparator(notification.isSeen, conditionValue)) ||
      (has(notification, attr) && !comparator(notification[attr], conditionValue))
    )
      diff.push(attr);
  });

  return { result: diff.length === 0, delta: diff };
}
