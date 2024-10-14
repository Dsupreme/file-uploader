import dotenv from "dotenv";
dotenv.config({ path: [".env.local", ".env"] });

import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./src/db",
  schema: "./src/db/schema.ts",
  dialect: "mysql",
  dbCredentials: {
    host: process.env.DB_HOST!,
    database: process.env.DB!,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
  },
});
