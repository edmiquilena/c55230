import crypto from "crypto";
import mongoose from "mongoose";
import UserModel from "../../model/user.model.js";
import bcrypt from "bcrypt";
export default class UserManager {
  constructor() {}

  async getUsuarios() {
    const users = await UserModel.find();

    return users;
  }
  async getUsuarioByName(username) {
    return await UserModel.findOne({ username });
  }

  async recoverUserPassword(username, password) {
    const user = await UserModel.findOne({ username });
    if (!user) throw new Error("Usuario no encontrado!");

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();
    return true;
  }

  // minor
  async updateUser(username, password) {
    const user = await UserModel.findOne({ username });
    user.user.avatar = profile_picture;
    await user.save();
    const userObject = user.toObject();
    const userJSON = user.toJSON();
    const products = await model.find({});
    // res.render("index", { prod: products });
  }

  // * usuario = {nombre, apellido, username, password, avatar}

  async crearUsuario(usuario) {
    const salt = await bcrypt.genSalt(10);
    usuario.password = await bcrypt.hash(usuario.password, salt);
    const user = await UserModel.create(usuario);
    return user;
  }

  // *
  async validarUsuario(username, password) {
    const user = await UserModel.findOne({ username });
    if (!user) return false;
    const isEqual = await bcrypt.compare(password, user.password);
    return isEqual ? user.toObject() : false;
  }
}
