import { Router as ExpressRouter } from "express";

export default class Router {
  constructor() {
    this.router = ExpressRouter();
    this.init();
  }

  getRouter() {
    return this.router;
  }
  init() {}

  get(path, ...callbacks) {
    this.router.get(
      path,
      this.generateCustomResponses,
      this.applyCallbacks(callbacks)
    );
  }

  post(path, ...callbacks) {
    this.router.post(
      path,
      this.generateCustomResponses,
      this.applyCallbacks(callbacks)
    );
  }

  put(path, ...callbacks) {
    this.router.put(
      path,
      this.generateCustomResponses,
      this.applyCallbacks(callbacks)
    );
  }

  delete(path, ...callbacks) {
    this.router.delete(
      path,
      this.generateCustomResponses,
      this.applyCallbacks(callbacks)
    );
  }

  generateCustomResponses = (req, res, next) => {
    res.sendSuccess = (data) => res.send({ error: false, data });

    res.sendError = (data) => res.status(500).send({ error: true, msg: data });
    next();
  };

  applyCallbacks(callbacks) {
    return callbacks.map((cb) => async (...params) => {
      // req, res, next
      try {
        await cb.apply(this, params);
      } catch (e) {
        console.log(e);
        params[1].status(500).send(e.message);
      }
    });
  }
}
