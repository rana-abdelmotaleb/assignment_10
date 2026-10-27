import { includes } from "zod";
import { userModel } from "../../database/model/user.model.js";
import { UnauthorizedException } from "../exciptions/error.exciptions.js";

export const checkRole = (roles) => {
  return async (req, res, next) => {
    let userData = await userModel.findById(req.user.id);
    if (!userData.role.includes(roles)) {
      return UnauthorizedException({
        message: "You Are UnAuthorized to access",
      });
    }

    next();
  };
};
