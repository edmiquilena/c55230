const Toys = [];
export const find = async () => {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       resolve(Toys);
  //     }, 1000);
  //   });
  return Toys;
};

export const findOne = () => {
  const toy = Toys.find((toy) => toy.id == req.params.id);
  return toy;
};

export const create = (data) => {
  Toys.push({ ...data, id: Toys.length });
};
