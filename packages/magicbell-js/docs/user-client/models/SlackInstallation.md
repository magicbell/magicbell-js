# SlackInstallation

**Properties**

| Name                | Type            | Required | Description                                                        |
| :------------------ | :-------------- | :------- | :----------------------------------------------------------------- |
| accessToken         | string          | ✅       | Bot token returned from the Slack OAuth exchange.                  |
| appId               | string          | ✅       | Slack app identifier for the installed app.                        |
| authedUser          | AuthedUser      | ✅       |                                                                    |
| team                | Team            | ✅       |                                                                    |
| botUserId           | string          | ❌       | Slack user ID of the installed bot.                                |
| enterprise          | Enterprise      | ❌       |                                                                    |
| expiresIn           | number          | ❌       | Seconds until the bot access token expires.                        |
| id                  | string          | ❌       | Unique identifier MagicBell assigns to the Slack installation.     |
| incomingWebhook     | IncomingWebhook | ❌       |                                                                    |
| isEnterpriseInstall | boolean         | ❌       | Indicates whether the installation occurred on an enterprise grid. |
| refreshToken        | string          | ❌       | Refresh token for regenerating the bot access token.               |
| scope               | string          | ❌       | Space-delimited OAuth scopes granted to the bot token.             |
| tokenType           | string          | ❌       | Type of bot token returned by Slack.                               |

# AuthedUser

**Properties**

| Name         | Type   | Required | Description                                             |
| :----------- | :----- | :------- | :------------------------------------------------------ |
| id           | string | ✅       | Slack user ID for the installer.                        |
| accessToken  | string | ❌       | User token returned from the OAuth exchange.            |
| expiresIn    | number | ❌       | Seconds until the user token expires.                   |
| refreshToken | string | ❌       | Refresh token for the authed user.                      |
| scope        | string | ❌       | Space-delimited OAuth scopes granted to the user token. |
| tokenType    | string | ❌       | Token type value provided by Slack.                     |

# Team

**Properties**

| Name | Type   | Required | Description                                 |
| :--- | :----- | :------- | :------------------------------------------ |
| id   | string | ✅       | Workspace ID where the app was installed.   |
| name | string | ❌       | Workspace name where the app was installed. |

# Enterprise

**Properties**

| Name | Type   | Required | Description                 |
| :--- | :----- | :------- | :-------------------------- |
| id   | string | ✅       | Enterprise grid identifier. |
| name | string | ✅       | Enterprise grid name.       |

# IncomingWebhook

**Properties**

| Name             | Type   | Required | Description                                  |
| :--------------- | :----- | :------- | :------------------------------------------- |
| channel          | string | ✅       | Human readable name for the webhook channel. |
| configurationUrl | string | ✅       | URL users can visit to manage the webhook.   |
| url              | string | ✅       | Webhook URL that Slack posts events to.      |
