import { BadRequestException } from "../exciptions/error.exciptions.js";

export const validation = (schema) => {
  return (req, res, next) => {
    let { success, error } = schema.safeParse(req.body);
    console.log({ success, error });

    if (!success) {
      return BadRequestException({ message: "Invalied data" });
    }
    next();
  };
};
