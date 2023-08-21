import zod from "zod";

/**
 * PLEASE DO NOT ACCESS ENVIRONMENT `process.env` OUTSIDE THIS FILE.
 */

const envSchema = zod.object({
  NODE_ENV: zod.enum(["development", "production", "test"]),
  PORT: zod.string().default("5000"),
  MONGO_DB_URL: zod.string(),
});

const env = envSchema.parse(process.env);

export default env;
