const fs = require('fs');

module.exports = (request, options) => {
  const { defaultResolver } = options;
  const resolvedPath = defaultResolver(request, options);

  // try resolve tshy module resolution polyfills
  const cjsPath = resolvedPath.replace(/\.ts$/, '-cjs.cts');
  if (fs.existsSync(cjsPath)) return cjsPath;

  return resolvedPath;
}
