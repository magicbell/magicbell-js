---
'magicbell-js': major
---

Upgrade to Zod 4.6.7 to address CVE-2023-54404. Bounded collections now reject oversized inputs before validating their elements. The SDK's declarations now use Zod 4. Validation issue details and default error messages follow Zod 4's format. Zod 4 uses modern JavaScript syntax and cannot run on Node.js 10.
