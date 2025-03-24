# UsersService

A list of all methods in the `UsersService` service. Click on the method name to view detailed information about that method.

| Methods                   | Description |
| :------------------------ | :---------- |
| [listUsers](#listusers)   |             |
| [deleteUser](#deleteuser) |             |

## listUsers

- HTTP Method: `GET`
- Endpoint: `/users`

**Parameters**

| Name          | Type   | Required | Description |
| :------------ | :----- | :------- | :---------- |
| limit         | number | ❌       |             |
| startingAfter | string | ❌       |             |
| endingBefore  | string | ❌       |             |

**Return Type**

`ArrayOfUsers`

**Example Usage Code Snippet**

```typescript
import { Client } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.users.listUsers({
    limit: 9,
    startingAfter: 'starting_after',
    endingBefore: 'ending_before',
  });

  console.log(data);
})();
```

## deleteUser

- HTTP Method: `DELETE`
- Endpoint: `/users/{user_id}`

**Parameters**

| Name   | Type   | Required | Description |
| :----- | :----- | :------- | :---------- |
| userId | string | ✅       |             |

**Return Type**

`UserDiscardResult`

**Example Usage Code Snippet**

```typescript
import { Client } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.users.deleteUser('user_id');

  console.log(data);
})();
```
