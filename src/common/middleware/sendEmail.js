import nodemailer from "nodemailer";
import { env } from "../../config/env.service.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: env.email,
    pass: env.password,
  },
});

export const sendEmail = async ({ to, subject, html }) => {
  await transporter.sendMail({
    from: "saraha@gmail.com",
    to,
    subject,
    html,
  });
};
