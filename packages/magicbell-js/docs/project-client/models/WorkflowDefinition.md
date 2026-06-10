# WorkflowDefinition

**Properties**

| Name     | Type                                                    | Required | Description                                                            |
| :------- | :------------------------------------------------------ | :------- | :--------------------------------------------------------------------- |
| key      | string                                                  | ✅       | Unique identifier for this workflow definition.                        |
| steps    | [WorkflowDefinitionSteps](WorkflowDefinitionSteps.md)[] | ✅       | Ordered list describing each action that will run inside the workflow. |
| disabled | boolean                                                 | ❌       | When true, prevents the workflow from being triggered.                 |
