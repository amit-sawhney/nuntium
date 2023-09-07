const { zodToJsonSchema } = require('zod-to-json-schema');

const TS_TYPES = [
  'object',
  'string',
  'boolean',
  'number',
  'boolean',
  'array',
  'null',
];
const PRIMITIVES = ['string', 'boolean', 'number', 'boolean', 'null'];

const parseSchema = (schema, required = []) => {
  const isAnyOf = schema.hasOwnProperty('anyOf');

  if (isAnyOf) {
    const subSchemas = schema.anyOf;
    const parsedTypes = subSchemas.map((ss) =>
      parseSchema(ss, required ?? subSchemas.required),
    );

    return parsedTypes.join(' | ');
  }

  const type = schema.type;

  if (!type) {
    throw new Error(`Unrecognized schema shape: ${JSON.stringify(schema)}`);
  }

  if (Array.isArray(type)) {
    return type.join(' | ');
  } else if (!TS_TYPES.includes(type)) {
    // might just want to return 'unknown'
    throw new Error(`Unknown zod type: ${type}`);
  }

  // Object handling
  if (type === 'object') {
    const properties = [];

    Object.entries(schema.properties).forEach(([key, subSchema]) => {
      const parsedType = parseSchema(subSchema, subSchema.required ?? required);
      const optionalFlag = required.includes(key) ? '' : '?';

      properties.push(`${key}${optionalFlag}: ${parsedType}`);
    });

    return `{ ${properties.join('\n')} }`;
  }

  // Primitive handling
  if (PRIMITIVES.includes(type)) {
    return type;
  }

  // Array Handling
  if (type === 'array') {
    const parsedItems = parseSchema(
      schema.items,
      schema.items.required ?? required,
    );

    return `( ${parsedItems} )[]`;
  }
};

const parseZodToInterfaceString = (name, zodSchema) => {
  const json = zodToJsonSchema(zodSchema);

  const start = `export interface ${name} `;

  const body = parseSchema(json, json.required);

  return `${start}\n${body}\n`;
};

module.exports = parseZodToInterfaceString;
