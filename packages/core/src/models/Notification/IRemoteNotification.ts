export default interface IRemoteNotification {
  notification: {
    id: string;
    title: string;
    content: string | null;
    category: string | null;
    action_url: string | null;
    custom_attributes: Record<string, any> | null;
    read_at: number | null;
    seen_at: number | null;
    sent_at: number | null;
  };
}
