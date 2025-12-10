# GetRunResponse

**Properties**

| Name        | Type                 | Required | Description |
| :---------- | :------------------- | :------- | :---------- |
| createdAt   | string               | ❌       |             |
| id          | string               | ❌       |             |
| input       | any                  | ❌       |             |
| status      | GetRunResponseStatus | ❌       |             |
| workflowKey | string               | ❌       |             |

# GetRunResponseStatus

**Properties**

| Name        | Type   | Required | Description |
| :---------- | :----- | :------- | :---------- |
| completedAt | string | ❌       |             |
| error       | string | ❌       |             |
| nextStep    | number | ❌       |             |
| startedAt   | string | ❌       |             |
| state       | number | ❌       |             |
