import { Router } from "express";
import UserManager from "../dao/mongo/userManager.js";
import { generateToken } from "../utils/jwt.js";

import passportMW from "../utils/jwt.middleware.js";
import protectBy from "../utils/protect.middleware.js";
const router = Router();
const User = new UserManager();
router.post("/login", async (req, res) => {
  console.log(req.body);

  const user = await User.validarUsuario(req.body.username, req.body.password);
  if (!user) return res.send({ error: true });

  const token = generateToken({
    sub: user._id,
    user: { username: user.username },
  });
  res.cookie("accessToken", token, {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
  });

  res.send({ error: false, accessToken: token });
});

router.use(passportMW("jwt"));
router.use(protectBy("admin"));
router.get("/profile", (req, res) => {
  // req.user
  if (req.user.role == "admin") {
    res.send({ error: false, user: req.user });
  } else {
    res.send({ error: true, msg: "Invalid role" });
  }
});

router.get("/profile", passportMW("jwt"), protectBy("admin"), (req, res) => {
  // req.user
  if (req.user.role == "admin") {
    res.send({ error: false, user: req.user });
  } else {
    res.send({ error: true, msg: "Invalid role" });
  }
});
export default router;
