---
'magicbell': minor
---

Custom errors now include a `responseBody` property that holds the returned response
from the API, when available. Custom errors are now also exported so they can be
used with comparisons like `err instanceof MagicBellError`. Note that all errors
extend the `MagicBellError` base class.

They're exported from the root and `/errors`. For the sake of tree shaking, we
recommend using the latter.

```ts
import { MagicBellError, UnauthorizedError } from 'magicbell';
import { MagicBellError, UnauthorizedError } from 'magicbell/errors';
```
