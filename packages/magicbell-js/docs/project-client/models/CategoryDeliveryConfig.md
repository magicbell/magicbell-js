# CategoryDeliveryConfig

**Properties**

| Name     | Type                                                                  | Required | Description                                                |
| :------- | :-------------------------------------------------------------------- | :------- | :--------------------------------------------------------- |
| channels | [CategoryDeliveryConfigChannels](CategoryDeliveryConfigChannels.md)[] | ✅       | Ordered channel steps the delivery planner should execute. |
| key      | string                                                                | ✅       | Unique identifier for this delivery plan.                  |
| disabled | boolean                                                               | ❌       | Disables the plan so it cannot be executed.                |
