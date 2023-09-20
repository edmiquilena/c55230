import mongoose from "mongoose";
const ShopSchema = new mongoose.Schema({
  name: String,
  products: [],
});

const ShopModel = mongoose.model("Shops", ShopSchema);
export default ShopModel;
