require('dotenv').config();

const buildApiCallers = require('./build-api-callers');

const buildApiTypes = require('./build-api-types');
const buildExpressRouter = require('./build-express-router');

const main = async () => {
  const routes = await buildExpressRouter();
  const types = await buildApiTypes();

  if (routes.length !== types.length) {
    throw new Error('Routes and types count mismatch');
  }

  buildApiCallers(routes, types);
};

main();

module.exports = {};
