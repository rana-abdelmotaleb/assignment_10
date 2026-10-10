import z from "zod";

export const userLogicSchema = z.strictObject({
  email: z.string().email(),
  password: z.string(),
});
