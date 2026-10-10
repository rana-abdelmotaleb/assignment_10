import express from "express";
import "./config/env.service.js";
import { env } from "./config/env.service.js";
import authRouter from "./module/auth/auth.controller.js";
import { databaseConnection } from "./database/connection.js";
const app = express();
app.use(express.json());
app.use("/auth", authRouter);
databaseConnection();
app.use((err, req, res, next) => {
  res.status(err.cause?.status || 500).json({
    message: err.message,
  });
});
app.listen(env.port, () => {
  console.log(`server is running on port ${env.port}`);
});
