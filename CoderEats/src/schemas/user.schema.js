import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: {
    type: String,
    default: "user",
  },
  password: String,
  orders: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Orders",
    },
  ],
});
export default userSchema;
