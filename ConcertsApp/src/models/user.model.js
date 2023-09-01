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
  email: {
    type: String,
    default: "",
  },
  avatar: String,
  // salt: String,
  role: {
    type: String,
    enum: ["admin", "user", "mod", "cliente", "vendedor"],
    default: "user",
  },
});
const UserModel = mongoose.model("user", schema);
export default UserModel;
