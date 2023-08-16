import { Router } from "express";
import UserManager from "../dao/mongo/userManager.js";
import { isLogged, protectView } from "../utils/secure.middleware.js";

const userRouter = Router();
const User = new UserManager();

// * Login
userRouter.get("/login", isLogged, (req, res) => {
  res.render("login");
});

userRouter.post("/login", isLogged, async (req, res) => {
  const { username, password } = req.body;

  const user = await User.validarUsuario(username, password);
  if (!user) return res.redirect("/login");

  delete user.password;
  delete user.salt;
  req.session.user = user;
  res.redirect("/profile");
});

userRouter.get("/logout", protectView, async (req, res) => {
  req.session.destroy((er) => {
    res.send("sesion culminada!");
  });
});

userRouter.get("/profile", protectView, (req, res) => {
  const { nombre, apellido, username } = req.session.user;
  res.render("profile", { nombre, apellido, username });
});

userRouter.post("/register", isLogged, async (req, res) => {
  const { nombre, apellido, username, password } = req.body;
  const user = await User.crearUsuario({
    nombre: "eduardo",
    apellido: "m",
    username: "eduardo",
    password: "12345",
  });
  res.redirect("/profile");
});

//
export default userRouter;
