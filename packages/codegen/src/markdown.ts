/* eslint-disable no-console */
import fs from 'fs/promises';
import type { Heading, Link, Node, Parent, Root, RootContent } from 'mdast';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { frontmatterFromMarkdown, frontmatterToMarkdown } from 'mdast-util-frontmatter';
import { toMarkdown } from 'mdast-util-to-markdown';
import { frontmatter } from 'micromark-extension-frontmatter';
import path from 'path';
import { remove } from 'unist-util-remove';
import { EXIT, visit } from 'unist-util-visit';

type Tree = ReturnType<typeof fromMarkdown>;

export { remove, visit };
export type { Root, Tree };

export function insertFrontMatter(tree: Tree, frontMatter: Record<string, unknown>) {
  tree.children.unshift({
    type: 'yaml',
    value: Object.entries(frontMatter)
      .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
      .join('\n'),
  });
}

export function getTitle(tree: Tree): string {
  const titleNode = tree.children.find(
    (node) => isHeading(node) && (node as Parent).children?.some((child) => child.type === 'text'),
  );
  if (!titleNode) return '';

  return (titleNode as Parent).children.find((child) => child.type === 'text')?.value ?? '';
}

export function isHeading(node: Node): node is Heading {
  return node.type === 'heading';
}

export function removeFirstHeading(tree: Tree) {
  let found = false;
  return remove(tree, (node: Node) => {
    if (found) return false;

    if (isHeading(node)) {
      found = true;
      return true;
    }

    return false;
  });
}

export function removeAllBeforeHeading(tree: Tree, title: string) {
  let found = false;

  return remove(tree, (node: Node) => {
    if (found) return false;

    if (isHeading(node) && (node as Parent).children?.some((child) => child.type === 'text' && child.value === title)) {
      found = true;
      return false;
    }

    return true;
  });
}

export function replaceText(tree: Tree, text: string | RegExp, replacement: string): void {
  return visit(tree, (node: Node) => {
    if ('value' in node && typeof node.value === 'string') {
      node.value = node.value.replace(text, replacement);
    }
  });
}

export function reIndentHeadings(tree: Node, lowestLevel: number): void {
  let lowest = 99;

  visit(tree, 'heading', (node: Heading) => {
    lowest = Math.min(lowest, node.depth);
  });

  visit(tree, 'heading', (node: Heading) => {
    node.depth = Math.min(6, node.depth - lowest + lowestLevel) as Heading['depth'];
  });
}

export function reIndentSection(tree: Node, match: string, diff: number): void {
  let found = false;
  let minLevel = 0;

  visit(tree, 'heading', (node: Heading) => {
    if (!found) {
      if (!node.children?.some((c) => c.type === 'text' && c.value === match)) return;

      found = true;
      minLevel = node.depth;
    }

    if (node.depth < minLevel) return EXIT;
    node.depth += diff;
  });
}

export function mapLinks(tree: Node, cb: (url: string) => string): void {
  visit(tree, 'link', (node: Link) => {
    node.url = cb(node.url);
  });
}

export async function exists(path: string): Promise<boolean> {
  return fs
    .access(path)
    .then(() => true)
    .catch(() => false);
}

export async function read(filename: string) {
  console.log(`Reading ${filename}`);
  return fromMarkdown(await fs.readFile(filename, { encoding: 'utf-8' }), {
    extensions: [frontmatter(['yaml', 'toml'])],
    mdastExtensions: [frontmatterFromMarkdown(['yaml', 'toml'])],
  });
}

export async function write(tree: Tree, filename: string) {
  console.log(`Writing ${filename}`);
  await fs.mkdir(path.dirname(filename), { recursive: true });
  const md = toMarkdown(tree, { extensions: [frontmatterToMarkdown(['yaml', 'toml'])] });
  return await fs.writeFile(filename, md, { encoding: 'utf-8' });
}

export function replaceBlock(tree: Node, block: string, replacement: RootContent | Node | Node[]): void {
  const startComment = `<!-- AUTO-GENERATED-CONTENT:START (${block}) -->`;
  const endComment = `<!-- AUTO-GENERATED-CONTENT:END (${block}) -->`;

  const nodes = (tree as Parent).children;
  if (!nodes) return;

  let startIdx: number | null = null;
  let endIdx: number | null = null;

  nodes.forEach((node, idx) => {
    if (node.type === 'html') {
      if (node.value === startComment) startIdx = idx;
      if (node.value === endComment) endIdx = idx;
    }
  });

  const newNodes: any =
    (replacement as any).type === 'root'
      ? (replacement as any).children
      : Array.isArray(replacement)
      ? replacement
      : [replacement];

  if (startIdx === null || endIdx === null) {
    nodes.push({ type: 'html', value: startComment }, ...newNodes, { type: 'html', value: endComment });
    return;
  }

  nodes.splice(startIdx + 1, endIdx - startIdx - 1, ...newNodes);
}

export function getDirs(paths) {
  const allDirs = new Set<string>();

  for (const file of paths) {
    const dir = path.dirname(file);
    allDirs.add(dir);
  }

  return Array.from(allDirs);
}
