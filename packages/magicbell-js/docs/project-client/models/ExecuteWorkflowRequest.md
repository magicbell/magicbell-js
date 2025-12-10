# ExecuteWorkflowRequest

**Properties**

| Name  | Type   | Required | Description                                                                    |
| :---- | :----- | :------- | :----------------------------------------------------------------------------- |
| key   | string | ✅       | The unique workflow key to execute (e.g. integration.stripe.charge.succeeded). |
| input | any    | ❌       | Optional JSON payload that will be passed as the workflow input context.       |
