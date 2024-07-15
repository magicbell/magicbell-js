import fs from 'fs';
import { pascalCase } from 'pascal-case';
import * as path from 'path';

const packageData = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
const { name, description, version, author, homepage, license } = packageData;

function replace(string, terms) {
  terms.forEach(({ from, to }) => {
    string = string?.replace(from, to);
  });

  return string;
}

export default {
  globs: ['src/components/*.ts'],
  exclude: ['**/*.styles.ts', '**/*.test.ts'],
  plugins: [
    // Append package data
    {
      name: 'mb-package-data',
      packageLinkPhase({ customElementsManifest }) {
        customElementsManifest.package = { name, description, version, author, homepage, license };
      },
    },

    // Infer tag names because we no longer use @customElement decorators.
    {
      name: 'mb-infer-tag-names',
      analyzePhase({ ts, node, moduleDoc }) {
        switch (node.kind) {
          case ts.SyntaxKind.ClassDeclaration: {
            const className = node.name.getText();
            const classDoc = moduleDoc?.declarations?.find((declaration) => declaration.name === className);

            const importPath = moduleDoc.path;
            const tagName = path.basename(importPath, '.ts');
            classDoc.tagNameWithoutPrefix = tagName.replace(/^[a-z]+-/, '');
            classDoc.tagName = tagName;

            // This used to be set to true by @customElement
            classDoc.customElement = true;
          }
        }
      },
    },

    {
      name: 'mb-react-event-names',
      analyzePhase({ ts, node, moduleDoc }) {
        switch (node.kind) {
          case ts.SyntaxKind.ClassDeclaration: {
            const className = node.name.getText();
            const classDoc = moduleDoc?.declarations?.find((declaration) => declaration.name === className);

            if (classDoc?.events) {
              classDoc.events.forEach((event) => {
                event.reactName = `on${pascalCase(event.name)}`;
                event.eventName = `${pascalCase(event.name)}Event`;
              });
            }
          }
        }
      },
    },

    {
      name: 'mb-translate-module-paths',
      packageLinkPhase({ customElementsManifest }) {
        customElementsManifest?.modules?.forEach((mod) => {
          // map src/mb-button.ts to mb-button.js
          const terms = [
            { from: /^\/?src\//, to: '' }, // Strip the src/ prefix
            { from: /\.(t|j)sx?$/, to: '.js' }, // Convert .ts to .js
          ];

          mod.path = replace(mod.path, terms);

          for (const ex of mod.exports ?? []) {
            ex.declaration.module = replace(ex.declaration.module, terms);
          }

          for (const dec of mod.declarations ?? []) {
            if (dec.kind === 'class') {
              if (dec.superclass) {
                dec.superclass.module = replace(dec.superclass.module, terms);
              }

              const entries = [dec.members, dec.attributes, dec.events].filter(Boolean).flat();
              for (const entry of entries) {
                if (entry.inheritedFrom) {
                  entry.inheritedFrom.module = replace(entry.inheritedFrom.module, terms);
                }
              }
            }
          }
        });
      },
    },
  ],
};
