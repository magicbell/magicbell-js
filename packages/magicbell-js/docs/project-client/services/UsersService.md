# UsersService

A list of all methods in the `UsersService` service. Click on the method name to view detailed information about that method.

| Methods                   | Description                                                                                                                         |
| :------------------------ | :---------------------------------------------------------------------------------------------------------------------------------- |
| [listUsers](#listusers)   | Lists all users in the project.                                                                                                     |
| [saveUser](#saveuser)     | Creates or updates a user with the provided details. The user will be associated with the project specified in the request context. |
| [deleteUser](#deleteuser) | Removes a user and all associated data from the project.                                                                            |

## listUsers

Lists all users in the project.

- HTTP Method: `GET`
- Endpoint: `/users`

**Parameters**

| Name          | Type   | Required | Description |
| :------------ | :----- | :------- | :---------- |
| limit         | number | ❌       |             |
| startingAfter | string | ❌       |             |
| endingBefore  | string | ❌       |             |
| query         | string | ❌       |             |

**Return Type**

`UserCollection`

**Example Usage Code Snippet**

```typescript
import { Client } from 'magicbell-js/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.users.listUsers({
    limit: 1,
    startingAfter: 'starting_after',
    endingBefore: 'ending_before',
    query: 'query',
  });

  console.log(data);
})();
```

## saveUser

Creates or updates a user with the provided details. The user will be associated with the project specified in the request context.

- HTTP Method: `PUT`
- Endpoint: `/users`

**Parameters**

| Name | Type                      | Required | Description       |
| :--- | :------------------------ | :------- | :---------------- |
| body | [User](../models/User.md) | ❌       | The request body. |

**Return Type**

`User`

**Example Usage Code Snippet**

```typescript
import { Client, User } from 'magicbell-js/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const user: User = {
    createdAt: 'created_at',
    customAttributes: {},
    email: 'email',
    externalId: 'external_id',
    firstName: 'first_name',
    id: 'id',
    lastName: 'last_name',
    lastNotifiedAt: 'last_notified_at',
    lastSeenAt: 'last_seen_at',
    updatedAt: 'updated_at',
  };

  const { data } = await client.users.saveUser(user);

  console.log(data);
})();
```

## deleteUser

Removes a user and all associated data from the project.

- HTTP Method: `DELETE`
- Endpoint: `/users/{user_id}`

**Parameters**

| Name   | Type   | Required | Description |
| :----- | :----- | :------- | :---------- |
| userId | string | ✅       |             |

**Example Usage Code Snippet**

```typescript
import { Client } from 'magicbell-js/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.users.deleteUser('user_id');

  console.log(data);
})();
```
