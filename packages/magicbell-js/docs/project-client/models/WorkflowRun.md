# WorkflowRun

**Properties**

| Name        | Type              | Required | Description |
| :---------- | :---------------- | :------- | :---------- |
| createdAt   | string            | ❌       |             |
| id          | string            | ❌       |             |
| status      | WorkflowRunStatus | ❌       |             |
| workflowKey | string            | ❌       |             |

# WorkflowRunStatus

**Properties**

| Name        | Type   | Required | Description |
| :---------- | :----- | :------- | :---------- |
| completedAt | string | ❌       |             |
| error       | string | ❌       |             |
| nextStep    | number | ❌       |             |
| startedAt   | string | ❌       |             |
| state       | number | ❌       |             |
