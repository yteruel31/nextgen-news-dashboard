import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().min(1),
    GUARDIAN_API_KEY: z.string().min(1),
    NODE_ENV: z.string().optional(),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    GUARDIAN_API_KEY: process.env.GUARDIAN_API_KEY,
    DATABASE_URL: process.env.DATABASE_URL,
  },
});
