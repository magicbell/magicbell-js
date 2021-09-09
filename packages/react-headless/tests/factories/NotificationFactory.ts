import faker from 'faker';
import { Factory } from 'rosie';

export default new Factory()
  .attr('id', () => faker.datatype.uuid())
  .attr('title', () => faker.random.words())
  .attr('content', () => faker.lorem.paragraphs())
  .attr('category', () => faker.random.word())
  .attr('actionUrl', () => faker.internet.url())
  .attr('seenAt', () => faker.date.recent().getTime() / 1000)
  .attr('sentAt', () => faker.date.recent().getTime() / 1000)
  .attrs({
    customAttributes: '{"accountId": 4}',
    metaData: '{"accountId": 4}',
    readAt: null,
  });

export const sampleNotification = {
  id: 'bba9bcda-bca5-4706-9431-6befc3859990',
  title: 'New Comment: Tables in knowledgebase',
  actionUrl: 'https://support.supportbee.com/tickets/27010651',
  content: '<p>This is a good content</p>',
  customAttributes: { ticketId: 27010651, commentId: 7675844 },
  seenAt: 1581947800,
  sentAt: 1581940485,
  readAt: null,
};
