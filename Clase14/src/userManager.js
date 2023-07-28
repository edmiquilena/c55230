import fs from "fs";
import crypto from "crypto";
import { dirname } from "path";
import { fileURLToPath } from "url";
import UserModel from "./schemas/user.model.js";
import mongoose from "mongoose";
const __dirname = dirname(fileURLToPath(import.meta.url));
mongoose.connect(`URL MONGO`);
export default class UserManager {
  constructor() {}

  async getUsuarios() {
    try {
      const users = await UserModel.find();
      return users;
    } catch (e) {
      return [];
    }
  }

  // minor
  async updateUser() {}
  // * usuario = {nombre, apellido, username, password, avatar}
  async crearUsuario(usuario) {
    usuario.salt = crypto.randomBytes(128).toString("base64");
    usuario.password = crypto
      .createHmac("sha256", usuario.salt)
      .update(usuario.password)
      .digest("hex");
    const user = await UserModel.insertMany([usuario]);
    return user;
  }

  // *
  async validarUsuario(username, password) {
    const user = await UserModel.findOne({ username });
    if (!user) return "Error, usuario no existe!";

    const loginHash = crypto
      .createHmac("sha256", user.salt)
      .update(password)
      .digest("hex");

    return loginHash == user.password
      ? "Usuario Loggeado!"
      : "usuario/contraseña incorrecta";
  }
}
