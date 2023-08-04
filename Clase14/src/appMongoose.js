import express from "express";
import mongoose from "mongoose";
import UserModel from "./models/user.model.js";
import usuariosRouter from "./routes/usuarios.js";
import * as con from "./config.js";
const app = express();

const conn = await mongoose.connect(
  `mongodb+srv://codercluster.hhamevg.mongodb.net/coder?retryWrites=true&w=majority`
);

// ? db.[nombre].insertOne()
// ? db.[nombre].find()
//? db.user.find()

app.use(express.json());
app.use("/api/user", usuariosRouter);
// app.get("/api/user", async (req, res) => {
//   const users = await UserModel.find();
//   res.send({ users });
// });

// // * crearUsuario(usuario)
// app.post("/api/user", async (req, res) => {
//   try {
//     // if (!req.file.filename) return res.send("Archivo no se ha identificado!");
//     const usuario = req.body;
//     const user = await UserModel.insertMany([usuario]);
//     res.send({ msg: "usuario creado!", user });
//   } catch (e) {
//     console.log(e);
//     res.status(502).send({ msg: "error al crear usuario!" });
//   }
// });

// // * validarUsuario(username, password)
// app.post("/api/user/login", async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     res.send({ msg: isValid });
//   } catch (e) {}
// });

app.listen(8080, () => {
  console.log("conectados!");
});
