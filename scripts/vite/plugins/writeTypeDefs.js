import { execSync } from 'child_process';

import { pkg } from '../settings.js';

export function writeTypeDefs() {
  let watch = false;

  return {
    name: 'generate types',
    config(config) {
      watch = config.build.watch;
    },
    async buildEnd(errors) {
      if (watch || errors) return;
      if (!pkg.typings && !pkg.types && !pkg.exports) {
        this.warn(`package ${pkg.name} does not export any types. Set package.json#typings if this is a mistake.`);
        return;
      }

      try {
        execSync(`tsc --emitDeclarationOnly --declaration --noEmit false --project tsconfig.build.json --outDir dist`, {
          stdio: 'inherit',
          stderr: 'inherit',
        });
      } catch (error) {
        this.error(`Failed to generate types for ${pkg.name}`);
      }
    },
  };
}
