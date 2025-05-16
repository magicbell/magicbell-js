# SlackFinishInstallResponse

**Properties**

| Name        | Type   | Required | Description                                                                                        |
| :---------- | :----- | :------- | :------------------------------------------------------------------------------------------------- |
| appId       | string | ✅       | The app ID of the Slack app that was originally configured at the project-level.                   |
| code        | string | ✅       | The code that was returned from the OAuth flow, and found in the query string of the redirect URL. |
| redirectUrl | string | ❌       |                                                                                                    |
