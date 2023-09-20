import mongoose from "mongoose";
import userSchema from "../schemas/user.schema";

const userModel = mongoose.model("Users", userSchema);
export default userModel;
