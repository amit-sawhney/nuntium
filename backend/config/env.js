"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = __importDefault(require("zod"));
/**
 * PLEASE DO NOT ACCESS ENVIRONMENT `process.env` OUTSIDE THIS FILE.
 */
const envSchema = zod_1.default.object({
    NODE_ENV: zod_1.default.enum(["development", "production", "test"]),
    PORT: zod_1.default.string().default("5000"),
    MONGO_DB_URL: zod_1.default.string(),
});
const env = envSchema.parse(process.env);
exports.default = env;
