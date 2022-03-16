import faker from 'faker';
import { Factory } from 'rosie';

export default new Factory()
  .attr('id', () => faker.datatype.uuid())
  .attr('title', () => faker.random.words())
  .attr('content', () => faker.lorem.paragraphs())
  .attr('actionUrl', () => faker.internet.url())
  .attr('category', () => faker.random.word())
  .attr('seenAt', () => faker.date.recent().getTime() / 1000)
  .attr('sentAt', () => faker.date.recent().getTime() / 1000)
  .attrs({
    topic: null,
    customAttributes: { accountId: 4 },
    readAt: null,
    archivedAt: null,
  });

export const sampleNotification = {
  id: 'bba9bcda-bca5-4706-9431-6befc3859990',
  title: 'New Comment: Tables in knowledgebase',
  content: '<p>This is a good content</p>',
  actionUrl: 'https://support.supportbee.com/tickets/27010651',
  topic: null,
  category: '',
  customAttributes: {
    ticketId: 27010651,
    comment: {
      id: 7675844,
    },
  },
  seenAt: 1581947800,
  sentAt: 1581940485,
  readAt: null,
  archivedAt: null,
};

export const emptyNotificationPage = {
  total: 0,
  current_page: 1,
  per_page: 15,
  total_pages: 1,
  project_id: 7,
  unseen_count: 0,
  unread_count: 0,
  notifications: [],
};
