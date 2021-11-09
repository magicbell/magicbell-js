import isNil from 'ramda/src/isNil';
import { IRemoteNotification } from '../../../types';
import { IStrategyComparator } from '../../../types/INotificationStore';

function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

export type NotificationCompareStrategy = (
  notification: IRemoteNotification,
  context: Record<string, any>,
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
  context: Record<string, any>,
  comparator: IStrategyComparator = eq,
) {
  const diff: string[] = [];

  Object.keys(context).forEach((attr) => {
    const conditionValue = context[attr];

    if (
      (attr === 'read' && !comparator(!isNil(notification.readAt), conditionValue)) ||
      (attr === 'seen' && !comparator(!isNil(notification.seenAt), conditionValue)) ||
      (Object.hasOwnProperty.call(notification, attr) && !comparator(notification[attr], conditionValue))
    )
      diff.push(attr);
  });

  return { result: diff.length === 0, delta: diff };
}
