#! /usr/bin/env -S node --experimental-strip-types
/* eslint-disable @typescript-eslint/ban-ts-comment */

import fs from 'node:fs/promises';
import path from 'node:path';

// @ts-ignore
import * as md from '@magicbell/codegen/markdown';
import * as glob from 'glob';
import type { Heading, Link, Root, RootContent } from 'mdast';
import urlJoin from 'url-join';

const root = process.cwd();
const outdir = path.join(root, 'docs-dist');
await fs.rm(outdir, { recursive: true, force: true });

const pkg = JSON.parse(await fs.readFile('package.json', 'utf-8'));
const repoUrl = urlJoin(pkg.repository.url.replace(/\.git$/, ''), 'blob/main/', pkg.repository.directory || '');

type InlineSectionConfig = {
  heading: string;
  shouldInlineLink: (url: string) => boolean;
};

const inlineSectionConfigs: InlineSectionConfig[] = [
  createInlineConfig('Services', 'docs/project-client/services/'),
  createInlineConfig('Services', 'docs/user-client/services/'),
];

function rewriteHref(url: string) {
  if (url.startsWith('#')) return url;
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return urlJoin(repoUrl, url);
}

// process readme
const [readme] = glob.sync('README.md', { cwd: root });
const readmeAst = (await md.read(readme)) as Root;
md.removeAllBeforeHeading(readmeAst, 'Setup & Configuration');
await inlineSections(readmeAst, inlineSectionConfigs);
md.reIndentHeadings(readmeAst, 2);
md.mapLinks(readmeAst, rewriteHref);
md.insertFrontMatter(readmeAst, { title: 'JavaScript SDK' });
await md.write(readmeAst, path.join(outdir, 'README.md'));

// copy snippets
await fs.copyFile(
  path.join(root, 'docs/user-client/snippets/snippets.json'),
  path.join(outdir, 'snippets.user-client.json'),
);
await fs.copyFile(
  path.join(root, 'docs/project-client/snippets/snippets.json'),
  path.join(outdir, 'snippets.project-client.json'),
);

async function inlineSections(tree: Root, configs: InlineSectionConfig[]) {
  for (const config of configs) {
    await inlineSection(tree, config);
  }
}

async function inlineSection(tree: Root, config: InlineSectionConfig) {
  let searchFrom = 0;

  while (searchFrom < tree.children.length) {
    const bounds = findSectionBounds(tree, config.heading, searchFrom);
    if (!bounds) return;

    const sectionNodes = tree.children.slice(bounds.sectionStart, bounds.sectionEnd);
    const inlineUrls = collectInlineUrls(sectionNodes, config.shouldInlineLink);
    if (!inlineUrls.length) {
      searchFrom = bounds.sectionEnd;
      continue;
    }

    let insertIndex = removeDetailsBlock(tree.children, bounds.sectionStart, bounds.sectionEnd) ?? bounds.sectionEnd;

    for (const url of inlineUrls) {
      const filename = path.join(root, url);
      if (!(await md.exists(filename))) {
        console.warn(`Skipping inline for ${url}, file not found`);
        continue;
      }

      const docAst = (await md.read(filename)) as Root;
      normalizeLinksRelativeTo(docAst, url);
      md.reIndentHeadings(docAst, (bounds.heading.depth ?? 1) + 1);
      tree.children.splice(insertIndex, 0, ...docAst.children);
      insertIndex += docAst.children.length;
    }

    return;
  }
}

function findSectionBounds(tree: Root, headingTitle: string, fromIndex = 0) {
  const children = tree.children;
  const headingIndex = children.findIndex((node, idx) => idx >= fromIndex && isHeadingWithTitle(node, headingTitle));
  if (headingIndex === -1) return null;

  const heading = children[headingIndex] as Heading;
  let sectionEnd = children.length;
  for (let i = headingIndex + 1; i < children.length; i += 1) {
    const child = children[i];
    if (child.type === 'heading' && (child as Heading).depth <= heading.depth) {
      sectionEnd = i;
      break;
    }
  }

  return { heading, sectionStart: headingIndex + 1, sectionEnd };
}

function isHeadingWithTitle(node: RootContent, title: string): node is Heading {
  if (!md.isHeading(node)) return false;
  if (!('children' in node)) return false;
  return node.children.some((child) => child.type === 'text' && 'value' in child && child.value === title) ?? false;
}

function collectInlineUrls(nodes: RootContent[], predicate: (url: string) => boolean) {
  const sectionRoot: Root = { type: 'root', children: nodes };
  const seen = new Set<string>();
  const urls: string[] = [];

  md.visit(sectionRoot, 'link', (node: Link) => {
    if (!predicate(node.url) || seen.has(node.url)) return;
    seen.add(node.url);
    urls.push(node.url);
  });

  return urls;
}

function removeDetailsBlock(nodes: RootContent[], start: number, end: number) {
  let openIndex: number | null = null;

  for (let i = start; i < end; i += 1) {
    const node = nodes[i];
    if (node.type === 'html' && typeof node.value === 'string' && node.value.includes('<details')) {
      openIndex = i;
    }

    if (
      openIndex !== null &&
      node.type === 'html' &&
      typeof node.value === 'string' &&
      node.value.includes('</details>')
    ) {
      const deleteCount = i - openIndex + 1;
      nodes.splice(openIndex, deleteCount);
      return openIndex;
    }
  }

  return null;
}

function createInlineConfig(heading: string, prefix: string): InlineSectionConfig {
  return {
    heading,
    shouldInlineLink: (url) => url.startsWith(prefix),
  };
}

function normalizeLinksRelativeTo(tree: Root, sourcePath: string) {
  const normalizedSource = sourcePath.replace(/\\/g, '/');
  const sourceDir = normalizedSource.substring(0, normalizedSource.lastIndexOf('/'));

  md.mapLinks(tree, (url) => resolveRelativeLink(url, sourceDir));
}

function resolveRelativeLink(url: string, sourceDir: string) {
  if (!url || url.startsWith('#')) return url;
  if (/^[a-z]+:\/\//i.test(url)) return url;
  if (url.startsWith('mailto:')) return url;

  const normalized = url.replace(/\\/g, '/');
  const parts = [sourceDir, normalized].filter(Boolean);
  let resolved = parts.join('/');

  resolved = resolved
    .split('/')
    .filter((segment) => segment !== '.')
    .reduce<string[]>((stack, segment) => {
      if (segment === '..') {
        stack.pop();
      } else {
        stack.push(segment);
      }
      return stack;
    }, [])
    .join('/');

  return resolved;
}
