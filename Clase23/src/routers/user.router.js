import Router from "./RouterFactory.js";

export default class UserRouter extends Router {
  init() {
    this.get("/", (req, res) => {
      res.sendSuccess("hola mundo!");
    });

    this.get("/me", (req, res) => {
      res.sendError("error!");
    });
  }
}
