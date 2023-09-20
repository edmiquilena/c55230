import { Router } from "express";
import * as UserController from "../controllers/users.controller.js";
const router = Router();

router.post("/login", UserController.UserLogin);

router.post("/register", UserController.UserRegister);

router.get("/me", UserController.UserGetMe);

export default router;
