import mongoose from "mongoose";

const schema = new mongoose.Schema({
  nombre: {
    type: String,
  },
  apellido: String,
  username: String,
  password: {
    type: String,
    required: true,
  },
  avatar: String,
  salt: String,
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});
const UserModel = mongoose.model("user", schema);
export default UserModel;
