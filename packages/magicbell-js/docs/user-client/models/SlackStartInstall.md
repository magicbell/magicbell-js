# SlackStartInstall

**Properties**

| Name        | Type     | Required | Description                                                         |
| :---------- | :------- | :------- | :------------------------------------------------------------------ |
| appId       | string   | ✅       | Slack app ID that the installation flow should use.                 |
| authUrl     | string   | ❌       | Optional override for the authorization URL returned to the client. |
| extraScopes | string[] | ❌       | Additional OAuth scopes to request during installation.             |
| redirectUrl | string   | ❌       | Custom redirect URL to use after OAuth completes.                   |
