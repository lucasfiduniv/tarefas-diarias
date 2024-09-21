"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const zod_1 = require("zod");
(0, dotenv_1.config)();
const envSchema = zod_1.z.object({
  DATABASE_URL: zod_1.z.string().url(),
});
exports.env = envSchema.parse(process.env);
