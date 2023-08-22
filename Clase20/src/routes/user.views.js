import { Router } from "express";
import UserManager from "../dao/mongo/userManager.js";
import { isLogged, protectView } from "../utils/secure.middleware.js";
import passport from "passport";

const userRouter = Router();
const User = new UserManager();

// * Login
userRouter.get("/login", isLogged, (req, res) => {
  res.render("login");
});

userRouter.post(
  "/login",
  passport.authenticate("login", {
    successRedirect: "/profile",
    failureRedirect: "/login",
  }),
  async (req, res) => {}
);

userRouter.get("/logout", protectView, async (req, res) => {
  req.session.destroy((er) => {
    res.send("sesion culminada!");
  });
});

userRouter.get("/profile", protectView, (req, res) => {
  console.log(req.user);
  const { nombre, apellido, username } = req.user;
  res.render("profile", { nombre, apellido, username });
});

userRouter.post(
  "/register",
  passport.authenticate("register", {
    successRedirect: "/profile",
    failureRedirect: "/register",
  }),
  async (req, res) => {}
);

userRouter.post("/recoverPassword", async (req, res) => {
  try {
    const { username, password } = req.body;

    const result = await User.recoverUserPassword(username, password);
    res.send({ result });
  } catch (e) {
    res.send({ error: true, msg: e.message });
  }
});

//
export default userRouter;
