const path = require('path');

const getFiles = require('../utils/get-files');

const BACKEND_FILES_PATH = path.join(__dirname, '../../backend/dist');

const formatPathToClass = (path) => {
  const parts = path.replace('.ts', '').split('/');

  const className = parts[parts.length - 1]
    .split('-')
    .map((p) => p[0].toUpperCase() + p.slice(1))
    .join('');

  return className;
};

module.exports = async () => {
  const files = getFiles(BACKEND_FILES_PATH, {
    shouldNormalize: true,
    shouldFilterPrivate: true,
    targetDirectory: 'method',
  });
   

  const routes = await Promise.all(
    files.map(async (f) => {
      const classname = formatPathToClass(f).replace('.js', '');
      const importPath = f.replace('.ts', '');

      const fullpath = path.resolve(BACKEND_FILES_PATH, importPath);

      const method = (await import(fullpath)).default.default;

      const distIndex = importPath.indexOf('dist');
      const relativePath = importPath.slice(distIndex).replace('dist', '@');
      return { import: relativePath, classname, method };
    }),
  );

  return routes.sort((a, b) => a.classname.localeCompare(b.classname));
};
