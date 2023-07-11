import fs from "fs";
import crypto from "crypto";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
export default class UserManager {
  constructor(file) {
    this.file = `${__dirname}/db/${file}.json`;
  }

  async getUsuarios() {
    try {
      const data = await fs.promises.readFile(this.file, "utf-8");
      const users = JSON.parse(data);
      return users;
    } catch (e) {
      await fs.promises.writeFile(this.file, JSON.stringify([]));
      return [];
    }
  }

  // minor
  async updateUser() {}
  // * usuario = {nombre, apellido, username, password, avatar}
  async crearUsuario(usuario) {
    const users = await this.getUsuarios();

    usuario.salt = crypto.randomBytes(128).toString("base64");
    usuario.password = crypto
      .createHmac("sha256", usuario.salt)
      .update(usuario.password)
      .digest("hex");

    users.push(usuario);
    try {
      await fs.promises.writeFile(this.file, JSON.stringify(users));
    } catch (e) {
      return "No se ha podido escribir el archivo!";
    }
  }

  // *
  async validarUsuario(username, password) {
    const users = await this.getUsuarios();
    const user = users.find((user) => user.username == username);
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
