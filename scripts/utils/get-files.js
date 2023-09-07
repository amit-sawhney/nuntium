const fs = require('fs');
const path = require('path');

// interface Options {
//   shouldNormalize?: boolean;
//   shouldFilterPrivate?: boolean;
//   targetDirectory?: string;
// }

const normalizePath = (path) => {
  const relativePath = path.split('backend/src/')[1];

  // If the path is not in the backend/src directory, return the original path
  return relativePath ? relativePath : path;
};

const handleOptions = (directories, options) => {
  let tempDirectories = directories;

  if (options.shouldNormalize) {
    tempDirectories = tempDirectories.map(normalizePath);
  }

  if (options.shouldFilterPrivate) {
    tempDirectories = tempDirectories.filter((d) => !d.includes('private'));
  }

  if (options.targetDirectory) {
    // WARNING: this will not work for an unnested method folder
    tempDirectories = tempDirectories.filter((d) =>
      d.includes(`/${options.targetDirectory}/`),
    );
  }

  return tempDirectories;
};

// Function to recursively get all subdirectories
module.exports = (directoryPath, options = {}) => {
  // Recursive helper to compute all subdirectories
  const recurse = (directoryPath, subdirectories = []) => {
    const items = fs.readdirSync(directoryPath);

    items.forEach((item) => {
      const itemPath = path.join(directoryPath, item);
      const isDirectory = fs.statSync(itemPath).isDirectory();

      if (isDirectory) {
        recurse(itemPath, subdirectories);
      } else {
        subdirectories.push(itemPath);
      }
    });

    return subdirectories;
  };

  // Recursive Entry point
  let subdirectories = recurse(directoryPath);

  // Handle optional configuration
  return handleOptions(subdirectories, options);
};
