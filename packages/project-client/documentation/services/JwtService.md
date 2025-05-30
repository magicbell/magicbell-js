# JwtService

A list of all methods in the `JwtService` service. Click on the method name to view detailed information about that method.

| Methods                                   | Description                                                                                                                                                                                                                                                  |
| :---------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [fetchProjectTokens](#fetchprojecttokens) | Retrieves a list of all active project-level JWT tokens. Returns a paginated list showing token metadata including creation date, last used date, and expiration time. For security reasons, the actual token values are not included in the response.       |
| [createProjectJwt](#createprojectjwt)     | Creates a new project-level JWT token. These tokens provide project-wide access and should be carefully managed. Only administrators can create project tokens. The returned token should be securely stored as it cannot be retrieved again after creation. |
| [discardProjectJwt](#discardprojectjwt)   | Immediately revokes a project-level JWT token. Once revoked, any requests using this token will be rejected. This action is immediate and cannot be undone. Active sessions using this token will be terminated.                                             |

## fetchProjectTokens

Retrieves a list of all active project-level JWT tokens. Returns a paginated list showing token metadata including creation date, last used date, and expiration time. For security reasons, the actual token values are not included in the response.

- HTTP Method: `GET`
- Endpoint: `/jwt/project`

**Parameters**

| Name          | Type   | Required | Description |
| :------------ | :----- | :------- | :---------- |
| limit         | number | ❌       |             |
| startingAfter | string | ❌       |             |
| endingBefore  | string | ❌       |             |

**Return Type**

`AccessTokenCollection`

**Example Usage Code Snippet**

```typescript
import { Client } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.jwt.fetchProjectTokens({
    limit: 4,
    startingAfter: 'starting_after',
    endingBefore: 'ending_before',
  });

  console.log(data);
})();
```

## createProjectJwt

Creates a new project-level JWT token. These tokens provide project-wide access and should be carefully managed. Only administrators can create project tokens. The returned token should be securely stored as it cannot be retrieved again after creation.

- HTTP Method: `POST`
- Endpoint: `/jwt/project`

**Parameters**

| Name | Type                                                                | Required | Description       |
| :--- | :------------------------------------------------------------------ | :------- | :---------------- |
| body | [CreateProjectTokenRequest](../models/CreateProjectTokenRequest.md) | ❌       | The request body. |

**Return Type**

`CreateTokenResponse`

**Example Usage Code Snippet**

```typescript
import { Client, CreateProjectTokenRequest } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const createProjectTokenRequest: CreateProjectTokenRequest = {
    expiry: 1,
    name: 'name',
  };

  const { data } = await client.jwt.createProjectJwt(createProjectTokenRequest);

  console.log(data);
})();
```

## discardProjectJwt

Immediately revokes a project-level JWT token. Once revoked, any requests using this token will be rejected. This action is immediate and cannot be undone. Active sessions using this token will be terminated.

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
