import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(`.env.${process.env.NODE_ENV}`) });

const port = process.env.PORT;
const databaseUri = process.env.DATABASE_URI;
const salt = process.env.SALT_ROUNDS;
const accessSignUser = process.env.ACCESS_SIGN_USER;
const refreshSignUser = process.env.REFRESH_SIGN_USER;
const accessSignAdmin = process.env.ACCESS_SIGN_ADMIN;
const refreshSignAdmin = process.env.REFRESH_SIGN_ADMIN;
const email = process.env.EMAIL;
const password = process.env.PASSWORD;

export const env = {
  port,
  databaseUri,
  salt,
  accessSignUser,
  refreshSignUser,
  accessSignAdmin,
  refreshSignAdmin,
  email,
  password,
};
