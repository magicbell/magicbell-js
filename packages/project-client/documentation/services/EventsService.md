# EventsService

A list of all methods in the `EventsService` service. Click on the method name to view detailed information about that method.

| Methods                 | Description                                           |
| :---------------------- | :---------------------------------------------------- |
| [getEvents](#getevents) | Retrieves a paginated list of events for the project. |

## getEvents

Retrieves a paginated list of events for the project.

- HTTP Method: `GET`
- Endpoint: `/events`

**Parameters**

| Name       | Type   | Required | Description |
| :--------- | :----- | :------- | :---------- |
| pageSize   | number | ❌       |             |
| pageAfter  | string | ❌       |             |
| pageBefore | string | ❌       |             |

**Return Type**

`ArrayOfEvents`

**Example Usage Code Snippet**

```typescript
import { Client } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.events.getEvents({
    pageSize: 123,
    pageAfter: 'page[after]',
    pageBefore: 'page[before]',
  });

  console.log(data);
})();
```
