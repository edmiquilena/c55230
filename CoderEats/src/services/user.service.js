import mongoose from "mongoose";
import User from "../daos/user.dao.js";
import bcrypt from "bcrypt";
const user = new User();

export const GetUserById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) throw new Error("UUID Invalid");
  try {
    const userInfo = await user.getOne({ _id: id });
    if (!userInfo) return "User does not exist";
    return userInfo;
  } catch (e) {
    return "User does not exist";
  }
};

export const LoginUser = async (email, password) => {
  const userInfo = await user.getOne({ email });

  if (!userInfo) throw new Error("User/password does not exist");
  const isValid = bcrypt.compare(password, userInfo.password);
  if (!isValid) throw new Error("User/password does not exist");

  return userInfo;
};

export const RegisterUser = async (userData) => {
  // * Joi, dto

  const newUser = await user.create(userData);
  return newUser;
};
