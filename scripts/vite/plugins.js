import { execSync } from 'child_process';
import fs from 'fs/promises';
import { join } from 'path';

import { createFilename } from './settings.js';

export async function writeIndexFile({ fileName, outDir }) {
  return {
    name: 'create index file',
    buildEnd: async () => {
      const code = `'use strict'
 
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./${createFilename({
    name: fileName,
    format: 'cjs',
    minify: true,
  })}');
} else {
  module.exports = require('./${createFilename({
    name: fileName,
    format: 'cjs',
    minify: false,
  })}');
}
`;

      await fs.mkdir(outDir, { recursive: true });
      return fs.writeFile(join(outDir, 'index.js'), code, 'utf-8');
    },
  };
}

export async function runTSC() {
  return {
    name: 'generate types',
    buildEnd: async (errors) => {
      if (errors) return;
      execSync(`tsc --emitDeclarationOnly --declaration --noEmit false --project tsconfig.build.json --outDir dist`);
    },
  };
}
