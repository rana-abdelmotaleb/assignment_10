import jwt from "jsonwebtoken";
import { env } from "../../config/env.service.js";

export const generateToken = async (data) => {
  let aud;
  let sign;
  let refreshSign;

  switch (data.role) {
    case "0":
      sign = env.accessSignUser;
      refreshSign = env.refreshSignUser;
      aud = "user";
      break;
    case "1":
      sign = env.accessSignAdmin;
      refreshSign = env.refreshSignAdmin;
      aud = "admin";
      break;
    default:
      break;
  }
  let accessToken = await jwt.sign({ id: data._id }, sign, {
    expiresIn: "30min",
    audience: aud,
  });
  let refreshToken = await jwt.sign({ id: data._id }, refreshSign, {
    expiresIn: "1y",
    audience: aud,
  });
  console.log(accessToken);
  return { accessToken, refreshToken };
};
export const generateNewAccessToken = async (refreshToken) => {
  let deCoded = await jwt.decode(refreshToken);
  let aud;
  let sign;
  let refreshSign;

  switch (deCoded.aud) {
    case "user":
      sign = env.accessSignUser;
      refreshSign = env.refreshSignUser;
      aud = "user";
      break;
    case "admin":
      sign = env.accessSignAdmin;
      refreshSign = env.refreshSignAdmin;
      aud = "admin";
      break;
    default:
      break;
  }
  let deCodedRefresh = await jwt.verify(refreshToken, refreshSign);
  let accessToken = await jwt.sign({ id: deCodedRefresh._id }, sign, {
    expiresIn: "30min",
    audience: aud,
  });

  console.log(accessToken);
  return accessToken;
};
