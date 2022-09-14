import { execSync } from 'child_process';

import { pkg } from '../settings.js';

export async function writeTypeDefs() {
  return {
    name: 'generate types',
    async buildEnd(errors) {
      if (errors) return;
      if (!pkg.typings) {
        this.warn(`package ${pkg.name} does not export any types. Set package.json#typings if this is a mistake.`);
        return;
      }
      execSync(`tsc --emitDeclarationOnly --declaration --noEmit false --project tsconfig.build.json --outDir dist`);
    },
  };
}
