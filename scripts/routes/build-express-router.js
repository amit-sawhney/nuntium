const path = require('path');
const fs = require('fs');

// const getFileMetadata = require("../utils/getFileMetadata");
const getRoutes = require('./get-routes');

// const { __dirname } = getFileMetadata(import.meta);

const BACKEND_FILES_PATH = path.join(__dirname, '../../backend/dist');
const ROUTES_PATH = path.resolve(
  __dirname,
  BACKEND_FILES_PATH.replace('dist', 'src'),
  'api/generated-routes.ts',
);

const dependencies = `
import { Router } from 'express';

import { createRoute } from './helpers';
`;

const router = `
const autogenRouter = Router();
`;

const routerExport = `
export default autogenRouter;
`;

/**
 * Generates the file in backend/src/api/routes.ts
 */
module.exports = async () => {
  const routeObjs = await getRoutes();

  const imports = routeObjs
    .map((r) => {
      return `import ${r.classname} from "${r.import}";`;
    })
    .sort()
    .join('\n');

  const routes = routeObjs
    .map((r) => {
      return `createRoute(autogenRouter, new ${r.classname}());`;
    })
    .sort()
    .join('\n');

  const parts = [
    dependencies,
    imports,
    router,
    routes,
    routerExport,
  ];

  fs.writeFileSync(ROUTES_PATH, parts.join('\n'), {
    flag: 'w+',
  });

  return routeObjs;
};
