const INDEX_TEMPLATE = `
'use strict'
 
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./__PROD_FILE__');
} else {
  module.exports = require('./__DEV_FILE__');
}
`;

function getRelatedBundles(file) {
  if (file.endsWith('.min.js')) {
    const devFile = file.endsWith('.production.min.js')
      ? file.replace(/\.production\.min\.js$/, '.development.js')
      : file.replace(/\.min\.js$/, '.js');
    return { prod: file, dev: devFile };
  } else {
    const prodFile = file.endsWith('.development.js')
      ? file.replace(/\.development\.js$/, '.production.min.js')
      : file.replace(/\.js$/, '.min.js');
    return { prod: prodFile, dev: file };
  }
}

export async function writeIndexFile() {
  return {
    name: 'create index file',
    async generateBundle(options, bundle) {
      if (options.format !== 'cjs') return;
      const entryFiles = Object.values(bundle)
        .filter((x) => x.isEntry && !x.isImplicitEntry) // only entry files
        .filter((x) => x.fileName.endsWith('.min.js')) // and only once per pair
        .map((x) => x.fileName);

      for (const file of entryFiles) {
        const output = getRelatedBundles(file);
        const source = INDEX_TEMPLATE.replace('__PROD_FILE__', output.prod)
          .replace('__DEV_FILE__', output.dev)
          .trimStart();

        // we don't want to overwrite bundled files
        if (output.dev === 'index.js') continue;

        this.emitFile({
          type: 'asset',
          fileName: 'index.js',
          source,
        });
      }
    },
  };
}
