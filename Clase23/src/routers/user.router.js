import jwt from "jsonwebtoken";
import Router from "./RouterFactory.js";

export default class UserRouter extends Router {
  init() {
    this.get("/", (req, res) => {
      res.sendSuccess("hola mundo!");
    });
    this.post("/login", (req, res) => {
      const { username, password } = req.body;
      if (username && password) {
        res.sendSuccess({ token: jwt.sign({ username }, "32e23322e32323e32") });
      }
    });
    this.get("/me", (req, res) => {
      res.sendSuccess({ name: "eduardo" });
    });
  }
}
