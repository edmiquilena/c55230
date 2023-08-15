import { Router } from "express";
import UserManager from "../userManager.js";
import { upload } from "../config/multer.js";
const usuariosRouter = Router();
const db = new UserManager("users");
// * getUsuarios()
usuariosRouter.get("/", async (req, res) => {
  const users = await db.getUsuarios();
  res.send(users);
});

// * crearUsuario(usuario)
usuariosRouter.post("/", async (req, res) => {
  try {
    // if (!req.file.filename) return res.send("Archivo no se ha identificado!");
    const usuario = req.body;

    await db.crearUsuario(usuario);
    res.send({ msg: "usuario creado!" });
  } catch (e) {
    console.log(e);
    res.status(502).send({ msg: "error al crear usuario!" });
  }
});

// * validarUsuario(username, password)
usuariosRouter.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const isValid = await db.validarUsuario(username, password);
    res.send({ msg: isValid });
  } catch (e) {}
});

export default usuariosRouter;
