import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  number: Number,
  products: [],
  total: Number,
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Users",
  },
  shop: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Shops",
  },
});

const OrderModel = mongoose.model("Orders", OrderSchema);
export default OrderModel;
