const instanceToType = {
  String: 'string',
  Number: 'number',
  Date: 'Date',
  Boolean: 'boolean',
  ObjectId: 'string',
  Mixed: 'any',
  Buffer: 'Buffer',
  Decimal128: 'number',
};

const parseSchema = (schema) => {
  const paths = schema.paths;

  const types = Object.entries(paths)
    .filter(([key, subSchema]) => subSchema.selected !== false)
    .map(([key, subSchema]) => {
      if (subSchema.hasOwnProperty('schema')) {
        // Nested schema
        return `${key}: { ${parseSchema(subSchema.schema)} }`;
      } else if (instanceToType[subSchema.instance]) {
        // Primitive type
        return `${key}: ${instanceToType[subSchema.instance]}`;
      } else if (subSchema.instance === 'Array') {
        // Array type
        if (subSchema.caster.instance) {
          // Array of primitive type
          return `${key}: ${instanceToType[subSchema.caster.instance]}[]`;
        } else if (subSchema.caster.schema) {
          // Array of nested schema
          return `${key}: ${parseSchema(subSchema.caster.schema)}[]`;
        } else {
          throw new Error(`Unknown array type: ${subSchema.caster}`);
        }
      } else {
        throw new Error(`Unknown instance type: ${subSchema.instance}`);
      }
    });

  return types.join(';\n');
};

const parseMongooseToInterface = (schema, interfaceName) => {
  const interface = `export interface ${interfaceName}`;

  // don't need _id in the root interface
  delete schema.paths._id;
  const parsedSchema = parseSchema(schema);

  return `${interface} {
        ${parsedSchema}
    }`;
};

module.exports = parseMongooseToInterface;
