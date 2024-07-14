/* eslint-disable no-console */
import fs from 'node:fs';
import path from 'node:path';

import glob from 'glob';

// Function to extract CSS variables from code files
function extractCssVars(content: string): Set<string> {
  const usedVars = new Set<string>();
  const matches = content.match(/var\(--[a-zA-Z0-9-]+\)/g) || [];
  for (const match of matches) {
    usedVars.add(match.slice(4, -1));
  }

  return usedVars;
}

// Function to remove unused CSS variables from theme.css
function removeUnusedCssVars(content: string, usedVars: Set<string>) {
  const lines = content.split('\n');
  const css = [];

  // Map to hold dependencies
  const dependencies: Record<string, Set<string>> = {};

  // Build dependencies map
  for (const line of lines) {
    const match = line.match(/(--[a-zA-Z0-9-]+):\s*([^;]+)/);
    if (match) {
      const [_, varName, value] = match;
      dependencies[varName] = new Set();
      const usagePattern = /var\((--[a-zA-Z0-9-]+)\)/g;

      let usageMatch = usagePattern.exec(value);
      while (usageMatch !== null) {
        dependencies[varName].add(usageMatch[1]);
        usageMatch = usagePattern.exec(value);
      }
    }
  }

  // Recursively check if a variable or its dependencies are used
  function isUsed(varName: string, checked = new Set<string>()) {
    if (usedVars.has(varName)) return true;
    if (checked.has(varName) || !dependencies[varName]) return false;
    checked.add(varName);
    for (const dep of dependencies[varName]) {
      if (isUsed(dep, checked)) return true;
    }
    return false;
  }

  // Filter lines based on usage
  for (const line of lines) {
    const match = line.match(/(--[a-zA-Z0-9-]+):/);
    if (!match) {
      css.push(line);
      continue;
    }

    if (isUsed(match[1])) {
      css.push(line);
    }
  }

  return css.join('\n');
}

function stripComments(content: string) {
  return content
    .replace(/\/\*[\s\S]*?\*\//g, '') // strip comments
    .replace(/\n\s*\n/g, '\n'); // clean double newlines;
}

function addToSet(target: Set<string>, source: Set<string>) {
  for (const val of source) {
    target.add(val);
  }
}

// Get all TypeScript files in src directory
const tsFiles = glob.sync('src/**/*.ts');
const outdir = 'dist/css';
fs.mkdirSync(outdir, { recursive: true });

const usedVars = new Set<string>();

for (const filepath of tsFiles) {
  const content = fs.readFileSync(filepath, { encoding: 'utf-8' });
  const cssVars = extractCssVars(content);
  addToSet(usedVars, cssVars);
}

const themeContent = fs.readFileSync('src/css/theme.css', {
  encoding: 'utf-8',
});
const themeCss = stripComments(removeUnusedCssVars(themeContent, usedVars));
fs.writeFileSync(path.join(outdir, 'theme.css'), themeCss);
console.log('built theme.css');

// theme.css can use vars defined in core.css
const themeVars = extractCssVars(themeCss);
addToSet(usedVars, themeVars);

const coreContent = fs.readFileSync('src/css/core.css', { encoding: 'utf-8' });
const coreCss = stripComments(removeUnusedCssVars(coreContent, usedVars));
fs.writeFileSync(path.join(outdir, 'core.css'), coreCss);
console.log('built core.css');
