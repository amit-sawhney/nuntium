const fs = require('fs');
const path = require('path');

const getRoutes = require('./get-routes');
const parseMongooseToInterface = require('./parse-mongoose-to-interface');
const parseZodToInterfaceJSON = require('./parse-zod-to-interface');

const FRONTEND_FILES_PATH = path.resolve(__dirname, '../../frontend/src');
const API_TYPES_PATH = path.resolve(FRONTEND_FILES_PATH, './api/generated-api-types.ts');

module.exports = async () => {
  const routes = await getRoutes();

  const types = routes.map((r) => {
    const method = new r.method();
    const params = method.params;
    const query = method.query;
    const body = method.body;
    const response = method.response;

    let paramsInterface = null;
    let queryInterface = null;
    let bodyInterface = null;
    let responseInterface = null;

    const paramsInterfaceName = `${r.classname}Params`;
    if (params) {
      paramsInterface = parseZodToInterfaceJSON(paramsInterfaceName, params);
    }

    const queryInterfaceName = `${r.classname}Query`;
    if (query) {
      queryInterface = parseZodToInterfaceJSON(queryInterfaceName, params);
    }

    const bodyInterfaceName = `${r.classname}Body`;
    if (body) {
      bodyInterface = parseZodToInterfaceJSON(bodyInterfaceName, body);
    }

    const responseInterfaceName = `${r.classname}Response`;
    if (response) {
      responseInterface = parseMongooseToInterface(
        response,
        responseInterfaceName,
      );
    }

    return {
      params: {
        name: paramsInterfaceName,
        interface: paramsInterface,
      },
      query: {
        name: queryInterfaceName,
        interface: queryInterface,
      },
      body: {
        name: bodyInterfaceName,
        interface: bodyInterface,
      },
      response: {
        name: responseInterfaceName,
        interface: responseInterface,
      },
    };
  });

  const typesOutput = types
    .filter((t) => t.response.interface)
    .map((t) => {
      const { params, query, body, response } = t;

      const interfaces = [
        params.interface,
        query.interface,
        body.interface,
        response.interface,
      ];

      return interfaces.filter((i) => i).join('\n\n');
    })
    .join('\n\n');

  fs.writeFileSync(API_TYPES_PATH, typesOutput, {
    flag: 'w+',
  });

  return types;
};
