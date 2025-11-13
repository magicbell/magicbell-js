# SmtpConfig

**Properties**

| Name     | Type              | Required | Description                     |
| :------- | :---------------- | :------- | :------------------------------ |
| from     | SmtpConfigFrom    | ✅       | Default sender email address    |
| host     | string            | ✅       | SMTP server hostname            |
| password | string            | ✅       | SMTP authentication password    |
| port     | number            | ✅       | SMTP server port                |
| username | string            | ✅       | SMTP authentication username    |
| replyTo  | SmtpConfigReplyTo | ❌       | Reply-to email address          |
| security | Security          | ❌       | SMTP security/encryption method |

# SmtpConfigFrom

Default sender email address

**Properties**

| Name  | Type   | Required | Description          |
| :---- | :----- | :------- | :------------------- |
| email | string | ✅       | Sender email address |
| name  | string | ❌       | Sender name          |

# SmtpConfigReplyTo

Reply-to email address

**Properties**

| Name  | Type   | Required | Description            |
| :---- | :----- | :------- | :--------------------- |
| email | string | ✅       | Reply-to email address |
| name  | string | ❌       | Reply-to name          |

# Security

SMTP security/encryption method

**Properties**

| Name     | Type   | Required | Description |
| :------- | :----- | :------- | :---------- |
| NONE     | string | ✅       | "none"      |
| SSL      | string | ✅       | "ssl"       |
| STARTTLS | string | ✅       | "starttls"  |
