---
'magicbell': minor
---

Added the `metrics` resource. The metrics resource contains a collection of endpoints that return metrics about the sent Notifications. All metrics are for the last 30 days. The following endpoints are available:

```ts
const notificationCounts = await magicbell.metrics.get();

const countsPerCategory = await magicbell.metrics.categories.get();

const countsPerTopic = await magicbell.metrics.topics.get();
```
