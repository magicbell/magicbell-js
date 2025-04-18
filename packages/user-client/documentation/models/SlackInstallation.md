# SlackInstallation

**Properties**

| Name                | Type            | Required | Description |
| :------------------ | :-------------- | :------- | :---------- |
| accessToken         | string          | ✅       |             |
| appId               | string          | ✅       |             |
| authedUser          | AuthedUser      | ✅       |             |
| team                | Team            | ✅       |             |
| botUserId           | string          | ❌       |             |
| enterprise          | Enterprise      | ❌       |             |
| expiresIn           | number          | ❌       |             |
| id                  | string          | ❌       |             |
| incomingWebhook     | IncomingWebhook | ❌       |             |
| isEnterpriseInstall | boolean         | ❌       |             |
| refreshToken        | string          | ❌       |             |
| scope               | string          | ❌       |             |
| tokenType           | string          | ❌       |             |

# AuthedUser

**Properties**

| Name         | Type   | Required | Description |
| :----------- | :----- | :------- | :---------- |
| id           | string | ✅       |             |
| accessToken  | string | ❌       |             |
| expiresIn    | number | ❌       |             |
| refreshToken | string | ❌       |             |
| scope        | string | ❌       |             |
| tokenType    | string | ❌       |             |

# Team

**Properties**

| Name | Type   | Required | Description |
| :--- | :----- | :------- | :---------- |
| id   | string | ✅       |             |
| name | string | ❌       |             |

# Enterprise

**Properties**

| Name | Type   | Required | Description |
| :--- | :----- | :------- | :---------- |
| id   | string | ✅       |             |
| name | string | ✅       |             |

# IncomingWebhook

**Properties**

| Name             | Type   | Required | Description |
| :--------------- | :----- | :------- | :---------- |
| channel          | string | ✅       |             |
| configurationUrl | string | ✅       |             |
| url              | string | ✅       |             |
