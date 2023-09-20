import orderModel from "../models/order.model.js";

export default class User {
  get = async () => orderModel.find();

  getOne = async (params) => orderModel.findOne(params);

  create = async (params) => orderModel.create(params);
}
