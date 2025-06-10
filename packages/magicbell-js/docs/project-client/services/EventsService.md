# EventsService

A list of all methods in the `EventsService` service. Click on the method name to view detailed information about that method.

| Methods                   | Description                                           |
| :------------------------ | :---------------------------------------------------- |
| [listEvents](#listevents) | Retrieves a paginated list of events for the project. |
| [fetchEvent](#fetchevent) | Fetches a project event by its ID.                    |

## listEvents

Retrieves a paginated list of events for the project.

- HTTP Method: `GET`
- Endpoint: `/events`

**Parameters**

| Name          | Type   | Required | Description |
| :------------ | :----- | :------- | :---------- |
| limit         | number | ❌       |             |
| startingAfter | string | ❌       |             |
| endingBefore  | string | ❌       |             |

**Return Type**

`EventCollection`

**Example Usage Code Snippet**

```typescript
import { Client } from 'magicbell-js/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.events.listEvents({
    limit: 3,
    startingAfter: 'starting_after',
    endingBefore: 'ending_before',
  });

  console.log(data);
})();
```

## fetchEvent

Fetches a project event by its ID.

- HTTP Method: `GET`
- Endpoint: `/events/{event_id}`

**Parameters**

| Name    | Type   | Required | Description |
| :------ | :----- | :------- | :---------- |
| eventId | string | ✅       |             |

**Return Type**

`Event`

**Example Usage Code Snippet**

```typescript
import { Client } from 'magicbell-js/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.events.fetchEvent('event_id');

  console.log(data);
})();
```
