import userModel from "../models/user.model.js";

export default class User {
  get = async () => userModel.find();

  getOne = async (params) => userModel.findOne(params);

  create = async (params) => userModel.create(params);
}
