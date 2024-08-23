# JwtService

A list of all methods in the `JwtService` service. Click on the method name to view detailed information about that method.

| Methods                                       | Description |
| :-------------------------------------------- | :---------- |
| [fetch_project_tokens](#fetch_project_tokens) |             |
| [create_project_jwt](#create_project_jwt)     |             |
| [discard_project_jwt](#discard_project_jwt)   |             |
| [create_user_jwt](#create_user_jwt)           |             |
| [discard_user_jwt](#discard_user_jwt)         |             |
| [fetch_user_tokens](#fetch_user_tokens)       |             |

## fetch_project_tokens

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

## create_project_jwt

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
    expiry: 1,
    name: 'culpa',
  };

  const { data } = await client.jwt.createProjectJwt(input);

  console.log(data);
})();
```

## discard_project_jwt

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

## create_user_jwt

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
    email: 'laborum esse do dolore ullamco',
    expiry: 6,
    externalId: 'ut officia',
    name: 'exercitation esse',
  };

  const { data } = await client.jwt.createUserJwt(input);

  console.log(data);
})();
```

## discard_user_jwt

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

## fetch_user_tokens

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
