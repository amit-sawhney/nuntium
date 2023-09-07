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
import { compose } from 'compose-middleware';

import AbstractMethod from './abstract-method';
`;

const router = `
const autogenRouter = Router();
`;

const createRoute = `
const createRoute = (method: AbstractMethod) => {
  autogenRouter[method.method](method.path, compose(method.middleware ?? []), async (req, res) => {
        // Validate request
        method.body?.parse(req.body);
        method.params?.parse(req.params);
        method.query?.parse(req.query);
        
        method.validate?.(req);

        // Execute method
        res.json(await method.execute(req as any));
    });
};
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
      return `createRoute(new ${r.classname}());`;
    })
    .sort()
    .join('\n');

  const parts = [
    dependencies,
    imports,
    router,
    createRoute,
    routes,
    routerExport,
  ];

  fs.writeFileSync(ROUTES_PATH, parts.join('\n'), {
    flag: 'w+',
  });

  return routeObjs;
};
