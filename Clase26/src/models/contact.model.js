import mongoose from "mongoose";

export const contactSchema = new mongoose.Schema({
  //   firstName: String,
  //   lastName: String,
  fullName: String,
  isInternational: Boolean,
  phoneNumber: String,
});
// "+1342-432-4234"
const contactModel = mongoose.model("contacts", contactSchema);
export default contactModel;
