import fs from "fs/promises";
import {join} from "path";
import {createFilename} from "./settings.js";
import { execSync } from 'child_process';

export async function writeIndexFile({outDir}) {
  return {
    name: 'create index file',
    buildEnd: async () => {
      const code = `'use strict'
 
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./${createFilename('cjs', true)}');
} else {
  module.exports = require('./${createFilename('cjs', false)}');
}
`

      await fs.mkdir(outDir, {recursive: true});
      return fs.writeFile(join(outDir, 'index.js'), code, 'utf-8');
    }
  }
}

export async function runTSC() {
  return {
    name: 'generate types',
    buildEnd: async (errors) => {
      if (errors) return;
      execSync(`tsc --emitDeclarationOnly --declaration --noEmit false --project tsconfig.build.json --outDir dist`);
    }
  }
}