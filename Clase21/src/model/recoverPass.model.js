import mongoose from "mongoose";

const schema = new mongoose.Schema({
  ip: String,
  requestedAt: Date,
});
const UserModel = mongoose.model("user", schema);
export default UserModel;
