import mongoose from "mongoose";
import config from "../config/index.js";
export let ContactsDAO;

// const DAO = {

//     MONGO: async () => {
//         mongoose.connect("mongodb://127.0.0.1:27017/coder");

//         const { default: contactsMongo } = await import(
//           "./mongo/contactsDao.mongo.js"
//         );
//         return contactsMongo;
//     },
//     MEM:async  () => {
//         const { default: contactsMem } = await import("./contactsDao.mem.js");
//         // * ./contactsDao.mem.js
//         return contactsMem;
//     }
// }
// const dao = await DAO[config.persistence??"MEM"]()
// export default dao

switch (config.persistence) {
  case "MONGO":
    // *
    mongoose.connect("mongodb://127.0.0.1:27017/coder");

    const { default: contactsMongo } = await import(
      "./mongo/contactsDao.mongo.js"
    );
    console.log(contactsMongo);
    ContactsDAO = contactsMongo;
    break;
  case "MEM":
  default:
    const { default: contactsMem } = await import("./contactsDao.mem.js");
    // * ./contactsDao.mem.js
    ContactsDAO = contactsMem;
    break;
}
