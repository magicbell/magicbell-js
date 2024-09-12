# SendgridConfig

**Properties**

| Name    | Type               | Required | Description              |
| :------ | :----------------- | :------- | :----------------------- |
| apiKey  | string             | ✅       | The API key for Sendgrid |
| from    | SendgridConfigFrom | ❌       |                          |
| replyTo | ReplyTo            | ❌       |                          |

# SendgridConfigFrom

**Properties**

| Name  | Type   | Required | Description                    |
| :---- | :----- | :------- | :----------------------------- |
| email | string | ✅       | The email address to send from |
| name  | string | ❌       | The name to send from          |

# ReplyTo

**Properties**

| Name  | Type   | Required | Description                   |
| :---- | :----- | :------- | :---------------------------- |
| email | string | ✅       | The email address to reply to |
| name  | string | ❌       | The name to reply to          |