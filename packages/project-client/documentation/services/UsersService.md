# UsersService

A list of all methods in the `UsersService` service. Click on the method name to view detailed information about that method.

| Methods                 | Description |
| :---------------------- | :---------- |
| [listUsers](#listusers) |             |

## listUsers

- HTTP Method: `GET`
- Endpoint: `/users`

**Parameters**

| Name       | Type   | Required | Description |
| :--------- | :----- | :------- | :---------- |
| pageSize   | number | ❌       |             |
| pageAfter  | string | ❌       |             |
| pageBefore | string | ❌       |             |

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
    pageSize: 9,
    pageAfter: 'page[after]',
    pageBefore: 'page[before]',
  });

  console.log(data);
})();
```
