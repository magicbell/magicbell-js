#! /usr/bin/env node --experimental-strip-types
/* eslint-disable @typescript-eslint/ban-ts-comment */

import fs from 'node:fs/promises';
import path from 'node:path';

// @ts-ignore
import * as md from '@magicbell/codegen/markdown';
import glob from 'glob';
import urlJoin from 'url-join';

const root = process.cwd();
const outdir = path.join(root, 'docs-dist');
await fs.rm(outdir, { recursive: true, force: true });

const pkg = JSON.parse(await fs.readFile('package.json', 'utf-8'));
const repoUrl = urlJoin(pkg.repository.url.replace(/\.git$/, ''), 'blob/main/', pkg.repository.directory || '');

function rewriteHref(url: string) {
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return urlJoin(repoUrl, url);
}

// process readme
const [readme] = glob.sync('README.md', { cwd: root });
const readmeAst = await md.read(readme);
md.removeAllBeforeHeading(readmeAst, 'Setup & Configuration');
md.reIndentHeadings(readmeAst, 1);
md.mapLinks(readmeAst, rewriteHref);
md.insertFrontMatter(readmeAst, { title: pkg.name });

await md.write(readmeAst, path.join(outdir, 'index.mdx'));
