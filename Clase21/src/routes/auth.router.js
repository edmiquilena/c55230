import { Router } from "express";
import passport from "passport";

const router = Router();

// * redireccionador
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  (req, res) => {}
);

// * callback
router.get(
  "/callback",
  passport.authenticate("github", {
    failureRedirect: "/login",
    successRedirect: "/profile",
  }),
  (req, res) => {}
);
export default router;
