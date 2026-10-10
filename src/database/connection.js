import mongoose from "mongoose";
import { env } from "../config/env.service.js";

export const databaseConnection = () => {
  mongoose
    .connect(env.databaseUri)
    .then(() => {
      console.log("database connected");
    })
    .catch((error) => {
      console.log(error);
    });
};
