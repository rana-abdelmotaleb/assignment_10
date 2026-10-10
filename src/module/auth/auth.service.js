import { env } from "../../config/env.service.js";
import { userModel } from "../../database/model/user.model.js";
import bycript from "bcrypt";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import {
  BadRequestException,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from "../../common/exciptions/error.exciptions.js";
import {
  generateNewAccessToken,
  generateToken,
} from "../../common/service/token.service.js";
export const signUp = async (body) => {
  let { userName, email, password, confirmPassword, gender } = body;
  if (password !== confirmPassword) {
    return BadRequestException({
      message: "Password and confirm password do not match",
    });
  }
  let exits = await userModel.findOne({ email });
  if (!exits) {
    let hashPassword = await bycript.hash(password, Number(env.salt));
    // let hashPassword = await argon2.hash(password);
    let data = await userModel.create({
      userName,
      email,
      password: hashPassword,
      gender,
    });
    if (hashPassword) {
      return { message: "User created successfully", data };
    }
  } else {
    return ConflictException({ message: "User already exists" });
  }
};

export const signIn = async (body) => {
  let { email, password } = body;
  let data = await userModel.findOne({ email });
  if (!data) {
    return NotFoundException({ message: "User not found" });
  }
  let isMatch = await bycript.compare(password, data.password);
  //   let isMatch = await argon2.verify(data.password, password);
  if (isMatch) {
    let { accessToken, refreshToken } = await generateToken(data);
    return {
      message: "User logged in successfully",
      accessToken,
      refreshToken,
    };
  } else {
    return UnauthorizedException({ message: "Invalid password" });
  }
};

export const getById = async (id) => {
  let data = await userModel.findById(id);
  if (data) {
    return { message: "User found", data };
  }
  return NotFoundException({ message: "User not found" });
};
export const generateAccessToken = async (body) => {
  let { refreshToken } = body;

  let accessToken = await generateNewAccessToken(refreshToken);
  if (accessToken) {
    return { message: "Access token generated successfully", accessToken };
  }
  return UnauthorizedException({ message: "Invalid refresh token" });
};
