const Toys = [];
export const find = async () => {
  return ToysModel.find({});
};

export const findOne = (id) => {
  const toy = ToysModel.find({ _id: id });
  return toy;
};

export const create = (data) => {
  ToysModel.create(data);
};
