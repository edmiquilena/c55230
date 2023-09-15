import mongoose from "mongoose";

export default class MongoSingleton {
  static #instance;

  constructor() {
    mongoose.connect(`mongodb://127.0.0.1:27017/ecommerce`);
  }

  static getInstance() {
    if (this.#instance) {
      console.log("anteriomente conectado");
    } else {
      console.log("conectando");
      this.#instance = new MongoSingleton();
    }
    return this.#instance;
  }
}
