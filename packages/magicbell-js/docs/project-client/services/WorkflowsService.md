# WorkflowsService

A list of all methods in the `WorkflowsService` service. Click on the method name to view detailed information about that method.

| Methods                                 | Description                                              |
| :-------------------------------------- | :------------------------------------------------------- |
| [fetchWorkflows](#fetchworkflows)       | Retrieves all workflow definitions for the project       |
| [saveWorkflow](#saveworkflow)           | Creates or updates a workflow definition for the project |
| [fetchWorkflow](#fetchworkflow)         | Retrieves a workflow definition by key                   |
| [createWorkflowRun](#createworkflowrun) | Executes a workflow with the provided input parameters   |
| [fetchWorkflowRun](#fetchworkflowrun)   | Retrieves the status and details of a workflow run       |
| [listWorkflowRuns](#listworkflowruns)   | Retrieves all runs for a specific workflow               |

## fetchWorkflows

Retrieves all workflow definitions for the project

- HTTP Method: `GET`
- Endpoint: `/workflows`

**Return Type**

`WorkflowList`

**Example Usage Code Snippet**

```typescript
import { Client } from 'magicbell-js/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.workflows.fetchWorkflows();

  console.log(data);
})();
```

## saveWorkflow

Creates or updates a workflow definition for the project

- HTTP Method: `PUT`
- Endpoint: `/workflows`

**Parameters**

| Name | Type                                                  | Required | Description       |
| :--- | :---------------------------------------------------- | :------- | :---------------- |
| body | [WorkflowDefinition](../models/WorkflowDefinition.md) | ❌       | The request body. |

**Return Type**

`WorkflowDefinition`

**Example Usage Code Snippet**

```typescript
import { Client, WorkflowDefinition, WorkflowDefinitionSteps } from 'magicbell-js/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const workflowDefinitionSteps: WorkflowDefinitionSteps = {
    command: 'command',
    if: 'if',
    input: {},
  };

  const workflowDefinition: WorkflowDefinition = {
    disabled: true,
    key: 'key',
    steps: [workflowDefinitionSteps],
  };

  const { data } = await client.workflows.saveWorkflow(workflowDefinition);

  console.log(data);
})();
```

## fetchWorkflow

Retrieves a workflow definition by key

- HTTP Method: `GET`
- Endpoint: `/workflows/*`

**Return Type**

`WorkflowDefinition`

**Example Usage Code Snippet**

```typescript
import { Client } from 'magicbell-js/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.workflows.fetchWorkflow();

  console.log(data);
})();
```

## createWorkflowRun

Executes a workflow with the provided input parameters

- HTTP Method: `POST`
- Endpoint: `/workflows/runs`

**Parameters**

| Name | Type                                                          | Required | Description       |
| :--- | :------------------------------------------------------------ | :------- | :---------------- |
| body | [ExecuteWorkflowRequest](../models/ExecuteWorkflowRequest.md) | ❌       | The request body. |

**Return Type**

`CreateRunResponse`

**Example Usage Code Snippet**

```typescript
import { Client, ExecuteWorkflowRequest } from 'magicbell-js/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const executeWorkflowRequest: ExecuteWorkflowRequest = {
    input: {},
    key: 'key',
  };

  const { data } = await client.workflows.createWorkflowRun(executeWorkflowRequest);

  console.log(data);
})();
```

## fetchWorkflowRun

Retrieves the status and details of a workflow run

- HTTP Method: `GET`
- Endpoint: `/workflows/runs/{run_id}`

**Parameters**

| Name  | Type   | Required | Description |
| :---- | :----- | :------- | :---------- |
| runId | string | ✅       |             |

**Return Type**

`GetRunResponse`

**Example Usage Code Snippet**

```typescript
import { Client } from 'magicbell-js/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.workflows.fetchWorkflowRun('run_id');

  console.log(data);
})();
```

## listWorkflowRuns

Retrieves all runs for a specific workflow

- HTTP Method: `GET`
- Endpoint: `/workflows/{workflow_key}/runs`

**Parameters**

| Name        | Type   | Required | Description |
| :---------- | :----- | :------- | :---------- |
| workflowKey | string | ✅       |             |

**Return Type**

`WorkflowRunCollection`

**Example Usage Code Snippet**

```typescript
import { Client } from 'magicbell-js/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.workflows.listWorkflowRuns('workflow_key');

  console.log(data);
})();
```
