export default interface IRemoteNotification {
  id: string;
  title: string;
  content: string | null;
  category: string | null;
  actionUrl: string | null;
  customAttributes: Record<string, any> | null | string;
  readAt: number | null;
  seenAt: number | null;
  archivedAt: number | null;
  sentAt: number | null;
}
