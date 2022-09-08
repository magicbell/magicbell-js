const glob = require('tiny-glob/sync');
const path = require('path');
const prettier = require('prettier');
const fs = require('fs');

function getPackages() {
  return glob(`./packages/**/package.json`).map((file) => [
    require(path.resolve(file)).name,
    path.dirname(file),
  ]);
}

function writeJson(filepath, json) {
  const data = prettier.format(JSON.stringify(json, null, 2), {
    parser: 'json',
  });

  fs.writeFileSync(filepath, data, 'utf-8');
}

function writePathsToTsConfig(pkgs) {
  const tsConfig = require('../tsconfig.json');
  tsConfig.compilerOptions.paths = Object.fromEntries(
    pkgs.map(([k, v]) => [k, [`${v}/src`]])
  );

  writeJson('./tsconfig.json', tsConfig);
}

function writeAliasToExamplePackageJson(pkgs) {
  const pkgJson = require('../example/package.json');

  const others = Object.entries(pkgJson.alias).filter(
    ([k, v]) => !v.startsWith('../packages/')
  );

  const locals = pkgs.map(([k, v]) => [k, `../${v}`]);
  pkgJson.alias = Object.fromEntries([...others, ...locals]);
  writeJson('./example/package.json', pkgJson);
}

const pkgs = getPackages();
writePathsToTsConfig(pkgs);
writeAliasToExamplePackageJson(pkgs);
