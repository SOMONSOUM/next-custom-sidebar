import { z } from "zod";

export const loginSchema = (t: (key: string, ...params: any[]) => string) =>
  z.object({
    email: z
      .string()
      .min(1, { message: t("validation.email_required") })
      .email({ message: t("validation.email_invalid") }),
    password: z.string().min(1, { message: t("validation.password_required") }),
    remember: z.optional(z.boolean()).default(false),
  });

export type LoginInput = z.infer<ReturnType<typeof loginSchema>>;
