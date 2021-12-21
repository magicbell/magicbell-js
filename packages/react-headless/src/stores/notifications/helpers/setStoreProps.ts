import uniqBy from 'ramda/src/uniqBy';

import INotificationStore from '../../../types/INotificationStore';

type Props = Omit<INotificationStore, 'context'>;
type Options = {
  reset: boolean;
  prepend: boolean;
};

/**
 * Function to set props on a notification store. The notifications are merged
 * unless `options.reset` is true.
 *
 * @param store Notifications store
 * @param props Props to set to the store
 * @param options.reset Do not prepend notifications to the store
 * @returns Store
 */
export default function setStoreProps(
  store: INotificationStore,
  props: Props,
  options: Partial<Options> = { reset: false },
): INotificationStore {
  const { notifications, ...meta } = props;
  const allNotifications = options.reset
    ? notifications
    : uniqBy(
        (notification) => notification.id,
        options.prepend ? [...notifications, ...store.notifications] : [...store.notifications, ...notifications],
      );

  return { context: store.context, notifications: allNotifications, ...meta };
}
