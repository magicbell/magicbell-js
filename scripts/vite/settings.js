// inspired by https://github.com/FormidableLabs/urql/blob/78368cf5bfcdd04bd663d8775d8883962128376b/scripts/rollup/settings.js
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import glob from 'tiny-glob/sync.js';

export const cwd = process.cwd();
const args = process.argv.slice(2);

function readJSON(filepath) {
  return JSON.parse(fs.readFileSync(path.resolve(process.cwd(), filepath), 'utf-8'));
}

export const pkg = JSON.parse(fs.readFileSync(path.resolve(cwd, './package.json'), 'utf-8'));

export const revision = execSync(`git rev-parse HEAD`).toString('utf-8');

const normalize = (name) =>
  name
    .replace(/[@\s/.]+/g, ' ')
    .trim()
    .replace(/\s+/, '-')
    .toLowerCase();

export const externalModules = ['fs', 'path', 'url', 'os', 'crypto'];
externalModules.push(...Object.keys(pkg.peerDependencies || {}));
externalModules.push(...Object.keys(pkg.devDependencies || {}));
externalModules.push(...Object.keys(pkg.dependencies || {}));
externalModules.push(...Object.keys(pkg.optionalDependencies || {}));

const externalPredicate = new RegExp(`^(${externalModules.join('|')})($|/)`);

export const isExternal = (id) => {
  if (id === 'babel-plugin-transform-async-to-promises/helpers') return false;

  return externalPredicate.test(id);
};

export const hasReact = externalModules.includes('react');
export const hasPreact = externalModules.includes('preact');
export const hasSvelte = externalModules.includes('svelte');
export const hasVue = externalModules.includes('vue');
export const mayReexport = hasReact || hasPreact || hasSvelte || hasVue;
export const isCI = !!process.env.CIRCLECI;
export const isAnalyze = !!process.env.ANALYZE;
export const shouldMinify = args.includes('--minify');
export const isWatchMode = args.includes('--watch') || args.includes('-w');

export const globalModules = {};

if (hasReact) {
  Object.assign(globalModules, {
    react: 'React',
    'react-dom': 'ReactDOM',
  });
}

export function createFilename({ name, format, minify }) {
  return [normalize(name), format, minify && 'min', 'js'].filter(Boolean).join('.');
}

export function createLibName(name) {
  return name
    .split('-')
    .map((x) => (x === 'magicbell' ? 'MagicBell' : x[0].toUpperCase() + x.slice(1)))
    .join('');
}

export function getPackageAliases(useSourceAsRoot) {
  const files = glob(`./packages/*/package.json`, { absolute: true });
  const entries = files.map((file) => [
    readJSON(file).name,
    path.join(path.dirname(file), useSourceAsRoot ? 'src' : ''),
  ]);
  return Object.fromEntries(entries);
}
