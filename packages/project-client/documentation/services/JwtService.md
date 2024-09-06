# JwtService

A list of all methods in the `JwtService` service. Click on the method name to view detailed information about that method.

| Methods                                   | Description |
| :---------------------------------------- | :---------- |
| [fetchProjectTokens](#fetchprojecttokens) |             |
| [createProjectJwt](#createprojectjwt)     |             |
| [discardProjectJwt](#discardprojectjwt)   |             |
| [createUserJwt](#createuserjwt)           |             |
| [discardUserJwt](#discarduserjwt)         |             |
| [fetchUserTokens](#fetchusertokens)       |             |

## fetchProjectTokens

- HTTP Method: `GET`
- Endpoint: `/jwt/project`

**Return Type**

`FetchTokensResponse`

**Example Usage Code Snippet**

```typescript
import { Client } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.jwt.fetchProjectTokens();

  console.log(data);
})();
```

## createProjectJwt

- HTTP Method: `POST`
- Endpoint: `/jwt/project`

**Parameters**

| Name | Type                                                                | Required | Description       |
| :--- | :------------------------------------------------------------------ | :------- | :---------------- |
| body | [CreateProjectTokenRequest](../models/CreateProjectTokenRequest.md) | ❌       | The request body. |

**Return Type**

`AccessToken`

**Example Usage Code Snippet**

```typescript
import { Client, CreateProjectTokenRequest } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const createProjectTokenRequest: CreateProjectTokenRequest = {
    expiry: 3,
    name: 'mollit elit commodo Lorem ullamco',
  };

  const { data } = await client.jwt.createProjectJwt(input);

  console.log(data);
})();
```

## discardProjectJwt

- HTTP Method: `DELETE`
- Endpoint: `/jwt/project/{token_id}`

**Parameters**

| Name    | Type   | Required | Description |
| :------ | :----- | :------- | :---------- |
| tokenId | string | ✅       |             |

**Return Type**

`DiscardTokenResponse`

**Example Usage Code Snippet**

```typescript
import { Client } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.jwt.discardProjectJwt('token_id');

  console.log(data);
})();
```

## createUserJwt

- HTTP Method: `POST`
- Endpoint: `/jwt/user`

**Parameters**

| Name | Type                                                          | Required | Description       |
| :--- | :------------------------------------------------------------ | :------- | :---------------- |
| body | [CreateUserTokenRequest](../models/CreateUserTokenRequest.md) | ❌       | The request body. |

**Return Type**

`AccessToken`

**Example Usage Code Snippet**

```typescript
import { Client, CreateUserTokenRequest } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const createUserTokenRequest: CreateUserTokenRequest = {
    email: 'ut sunt ullamco sint',
    expiry: 6,
    externalId: 'commodo dolore cupidatat et ut',
    name: 'do ea dolore',
  };

  const { data } = await client.jwt.createUserJwt(input);

  console.log(data);
})();
```

## discardUserJwt

- HTTP Method: `DELETE`
- Endpoint: `/jwt/user/{token_id}`

**Parameters**

| Name    | Type   | Required | Description |
| :------ | :----- | :------- | :---------- |
| tokenId | string | ✅       |             |

**Return Type**

`DiscardTokenResponse`

**Example Usage Code Snippet**

```typescript
import { Client } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.jwt.discardUserJwt('token_id');

  console.log(data);
})();
```

## fetchUserTokens

- HTTP Method: `GET`
- Endpoint: `/jwt/user/{user_id}`

**Parameters**

| Name   | Type   | Required | Description |
| :----- | :----- | :------- | :---------- |
| userId | string | ✅       |             |

**Return Type**

`FetchTokensResponse`

**Example Usage Code Snippet**

```typescript
import { Client } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.jwt.fetchUserTokens('user_id');

  console.log(data);
})();
```
