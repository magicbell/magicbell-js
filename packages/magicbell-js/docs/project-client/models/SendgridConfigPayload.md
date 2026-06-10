# SendgridConfigPayload

**Properties**

| Name    | Type                         | Required | Description              |
| :------ | :--------------------------- | :------- | :----------------------- |
| apiKey  | string                       | ✅       | The API key for Sendgrid |
| from    | SendgridConfigPayloadFrom    | ❌       |                          |
| replyTo | SendgridConfigPayloadReplyTo | ❌       |                          |

# SendgridConfigPayloadFrom

**Properties**

| Name  | Type   | Required | Description                    |
| :---- | :----- | :------- | :----------------------------- |
| email | string | ✅       | The email address to send from |
| name  | string | ❌       | The name to send from          |

# SendgridConfigPayloadReplyTo

**Properties**

| Name  | Type   | Required | Description                   |
| :---- | :----- | :------- | :---------------------------- |
| email | string | ✅       | The email address to reply to |
| name  | string | ❌       | The name to reply to          |
