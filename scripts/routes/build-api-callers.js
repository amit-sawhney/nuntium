const path = require('path');
const fs = require('fs');

const imports = `
import { callEndpoint, ErrorWrapper } from './api-helpers';
import * as types from './generated-api-types';
`;

const bulidFunction = (route, typeMap) => {
  const { method, classname } = route;
  const {
    params: { name: paramsName, interface: paramsInterface },
    query: { name: queryName, interface: queryInterface },
    body: { name: bodyName, interface: bodyInterface },
    response: { name: responseName },
  } = typeMap;

  const methodInstance = new method();

  const name = classname[0].toLowerCase() + classname.slice(1);

  const args = [];

  if (paramsInterface) {
    args.push(`params: types.${paramsName}`);
  }

  if (queryInterface) {
    args.push(`query: types.${queryName}`);
  }

  if (bodyInterface) {
    args.push(`body: types.${bodyName}`);
  }

  const returnType = `Promise<types.${responseName} | ErrorWrapper>`;

  const callEndpointArgs = [
    `url: '${methodInstance.path}'`,
    `method: '${methodInstance.method}'`,
  ];

  if (queryInterface) {
    callEndpointArgs.push('params: query');
  }

  if (paramsInterface) {
    callEndpointArgs.push('urlParams: params');
  }

  if (bodyInterface) {
    callEndpointArgs.push('data: body');
  }

  const bodyType = bodyInterface ? `types.${bodyName}` : 'never';

  const functionBody = `
  return callEndpoint<types.${responseName}, ${bodyType}>({
    ${callEndpointArgs.join(',\n')}
  });
  `;

  return `export const ${name} = (${args.join(', ')}): ${returnType} => {
    ${functionBody}
  }`;
};

const buildApiCallers = (routes, types) => {
  const functions = [];

  for (let i = 0; i < routes.length; i++) {
    const route = routes[i];
    const type = types[i];

    functions.push(bulidFunction(route, type));
  }

  const FRONTEND_FILES = path.resolve(__dirname, '../../frontend/src/api');
  const apiFile = path.resolve(FRONTEND_FILES, 'api.ts');

  const apiFileContent = `${imports}\n\n${functions.join('\n\n')}`;

  fs.writeFileSync(apiFile, apiFileContent, {
    flag: 'w+',
  });

  return functions;
};

module.exports = buildApiCallers;
