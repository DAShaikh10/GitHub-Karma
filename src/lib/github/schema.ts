import { z } from "zod";

import { THEME } from "@/lib/card";

/**
 * GitHub Karma request validation schema.
 *
 * Theme: Optional query parameter to specify the card theme. Must be one of the predefined themes.
 * Defaults to "default" if not provided.
 *
 * Username validation rules:
 * - Must be between 1 and 39 characters.
 * - Can only contain alphanumeric characters and hyphens.
 * - Cannot start or end with a hyphen.
 */

export const requestSchema = z.object({
  theme: z.enum(Object.keys(THEME)).optional().default("default"),
  username: z
    .string()
    .min(1, { message: "Username cannot be empty" })
    .max(39, { message: "Username cannot exceed 39 characters" })
    .regex(/^[a-zA-Z0-9-]+$/, { message: "Username can only contain alphanumeric characters and hyphens" })
    .refine((username) => !username.startsWith("-") && !username.endsWith("-"), {
      message: "Username cannot start or end with a hyphen",
    }),
});
