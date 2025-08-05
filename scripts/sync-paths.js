import fs from 'fs';
import path from 'path';
import prettier from 'prettier';
import glob from 'tiny-glob';

function readJSON(filepath) {
  return JSON.parse(fs.readFileSync(path.resolve(process.cwd(), filepath), 'utf-8'));
}

async function getPackages() {
  return glob(`./packages/*/package.json`).then((files) =>
    files.map((file) => [readJSON(file).name, path.dirname(file)]).sort(([a], [b]) => a.localeCompare(b)),
  );
}

function writeJson(filepath, json) {
  const data = prettier.format(JSON.stringify(json, null, 2), {
    parser: 'json',
  });

  fs.writeFileSync(filepath, data, 'utf-8');
}

function writePathsToTsConfig(pkgs) {
  const tsConfig = readJSON('./tsconfig.json');

  const others = Object.entries(tsConfig.compilerOptions.paths).filter(([k]) => k[0] === '~');

  const locals = pkgs.map(([k, v]) => [k, [`${v}/src`]]);
  tsConfig.compilerOptions.paths = Object.fromEntries([...others, ...locals]);
  writeJson('./tsconfig.json', tsConfig);
}

function writeAliasToExamplePackageJson(pkgs) {
  const pkgJson = readJSON('./example/floating-inbox/package.json');

  const others = Object.entries(pkgJson.alias).filter(([, v]) => !v.startsWith('../packages/'));

  const locals = pkgs.map(([k, v]) => [k, `../${v}`]);
  pkgJson.alias = Object.fromEntries([...others, ...locals]);
  writeJson('./example/floating-inbox/package.json', pkgJson);
}

function distributeFiles(pkgs, files) {
  for (const [_name, dir] of pkgs) {
    for (const file of files) {
      const src = path.resolve(process.cwd(), file);
      const dest = path.resolve(process.cwd(), dir, file);
      fs.copyFileSync(src, dest);
    }
  }
}

getPackages().then((pkgs) => {
  writePathsToTsConfig(pkgs);
  writeAliasToExamplePackageJson(pkgs);
  distributeFiles(pkgs, ['LICENSE']);
});
