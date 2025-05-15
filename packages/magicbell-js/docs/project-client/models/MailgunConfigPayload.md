# MailgunConfigPayload

**Properties**

| Name   | Type                     | Required | Description |
| :----- | :----------------------- | :------- | :---------- |
| apiKey | string                   | ✅       |             |
| domain | string                   | ✅       |             |
| region | Region                   | ✅       |             |
| from   | MailgunConfigPayloadFrom | ❌       |             |

# Region

**Properties**

| Name | Type   | Required | Description |
| :--- | :----- | :------- | :---------- |
| US   | string | ✅       | "us"        |
| EU   | string | ✅       | "eu"        |

# MailgunConfigPayloadFrom

**Properties**

| Name  | Type   | Required | Description                    |
| :---- | :----- | :------- | :----------------------------- |
| email | string | ✅       | The email address to send from |
| name  | string | ❌       | The name to send from          |
