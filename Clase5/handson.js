import fs from "fs";
import crypto from "crypto";

class userManager {
  constructor(file) {
    this.file = file;
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
  // * usuario = {nombre, apellido, username, password}
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
      : "usuario/contrase;a incorrecta";
  }
}
const users = new userManager("./usuarios.json");
try {
  await users.crearUsuario({
    nombre: "Eduardo 3",
    apellido: "M",
    username: "eduardo4",
    password: "coder1234",
  });

  const login = await users.validarUsuario("eduardo", "coder1234");
  console.log(login);
} catch (e) {}
