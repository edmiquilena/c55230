import { Router } from "express";
import passport from "passport";

const userViewRouter = Router();

userViewRouter.get("/login", async (req, res) => {
  res.render("login");
});

userViewRouter.post(
  "/login",
  passport.authenticate("login", {
    successRedirect: "/home",
    failureRedirect: "/login",
  }),
  async (req, res) => {}
);

userViewRouter.get("/register", async (req, res) => {
  res.render("register");
});

userViewRouter.post("/register", async (req, res) => {
  // * const valid = Manager.validarUsuarioContrasena()
  if (valid) {
    res.redirect("/home");
  } else {
    res.redirect("/login");
  }
});

export default userViewRouter;
