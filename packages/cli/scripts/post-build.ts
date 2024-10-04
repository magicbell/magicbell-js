import { replaceInFile, ReplaceInFileConfig } from 'replace-in-file';

import pkgJson from '../package.json';
import { pkg } from '../src/lib/pkg';

const config = {
  files: 'dist/*/lib/pkg.js',
  from: ['__PACKAGE_NAME__', '__PACKAGE_VERSION__'],
  to: [pkgJson.name, pkgJson.version],
} satisfies ReplaceInFileConfig;

for (const key of Object.values(pkg)) {
  if (!config.from.includes(key)) {
    process.stdout.write(`Unknown replacement key '${key}' in lib/pkg.ts\n`);
    process.exit(1);
  }
}

await replaceInFile(config);
