# SesConfig

**Properties**

| Name      | Type          | Required | Description                                      |
| :-------- | :------------ | :------- | :----------------------------------------------- |
| keyId     | string        | ✅       | AWS Access Key ID                                |
| region    | string        | ✅       | AWS Region                                       |
| secretKey | string        | ✅       | AWS Secret Key                                   |
| endpoint  | string        | ❌       | HTTP endpoint to send requests to (testing only) |
| from      | SesConfigFrom | ❌       |                                                  |

# SesConfigFrom

**Properties**

| Name  | Type   | Required | Description                    |
| :---- | :----- | :------- | :----------------------------- |
| email | string | ✅       | The email address to send from |
| name  | string | ❌       | The name to send from          |
