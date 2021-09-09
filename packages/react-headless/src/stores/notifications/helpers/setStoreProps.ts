import { uniqBy } from 'ramda';
import INotificationsStore from '../../../types/INotificationsStore';

type Props = Omit<INotificationsStore, 'context'>;
type Options = {
  reset: boolean;
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
  store: INotificationsStore,
  props: Props,
  options: Partial<Options> = { reset: false },
): INotificationsStore {
  const { notifications, ...meta } = props;
  const allNotifications = options.reset
    ? notifications
    : uniqBy((notification) => notification.id, [...store.notifications, ...notifications]);

  return { context: store.context, notifications: allNotifications, ...meta };
}
