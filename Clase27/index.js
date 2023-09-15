import MongoSingleton from "./mongo.singleton.js";

const instance1 = MongoSingleton.getInstance();
const instance2 = MongoSingleton.getInstance();
MongoSingleton.getInstance();
MongoSingleton.getInstance();
