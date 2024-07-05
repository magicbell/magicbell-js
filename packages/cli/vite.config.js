import { builtinModules } from 'module';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

import baseConfig from '../../scripts/vite/vite.config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(async (configEnv) => {
  const base = await baseConfig(configEnv);
  base.build.target = 'node16';

  // alias ws so that vite doesn't import the browser package
  base.resolve.alias.ws = path.join(__dirname, '../../node_modules/ws/lib/websocket.js');
  base.resolve.alias.debug = path.join(__dirname, '../../node_modules/debug/src/node.js');
  base.build.lib.formats = ['cjs'];
  base.build.lib.fileName = () => 'index.cjs';
  base.build.sourcemap = false;

  base.build.rollupOptions.external = builtinModules;
  return base;
});
