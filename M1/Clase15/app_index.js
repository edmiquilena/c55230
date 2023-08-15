import mongoose from "mongoose";
const con = mongoose.connect(`mongodb://127.0.0.1:27017/coderhouse`);
con.then(() => console.log("conectados"));
con.catch((e) => console.log(e));

// first_name
// "Orly"
// last_name
// "Restall"
// email
// "orestall0@multiply.com"
// gender
// "Female"

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    index: true,
  },
  last_name: String,
  email: String,
  gender: String,
});
// * Array<{course: ObjectId}>

const userModel = mongoose.model("users", userSchema);
// * find() => 3ms 0ms 2ms => 15ms
// * find({first_name}) => 20ms 1ms
const users = await userModel.find({
  first_name: "Jordon",
  last_name: "Hun",
});

console.log(users);
