export default interface IRemoteNotification {
  id: string;
  title: string;
  content: string | null;
  category: string | null;
  actionUrl: string | null;
  // TODO: Suggested minimla is to convert any to unknown or maybe use
  //       a generic IRemoteNotification<CustomAttributeType>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customAttributes: Record<string, any> | null | string;
  readAt: number | null;
  seenAt: number | null;
  archivedAt: number | null;
  sentAt: number | null;
}
