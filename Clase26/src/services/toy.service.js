import ContactsDAO from "../dao/mongo/contactsDao.mongo.js";
import * as ToyDAO from "../dao/mongo/toy.dao.js";
export const GetAllToys = async ({ limit, query, page }) => {
  return await ToyDAO.find();
};
// ?  => find, findOne, update, delete, create
export const GetOneToyById = async (id) => {
  const toy = ToyDAO.findOne(id);
  if (!toy) return new Error("Juguete no existe!");
  return toy;
};

export const CreateToy = async (data) => {
  if (data.name == "" || data.price == "")
    throw new Error("Formulario no valido");

  return ToyDAO.create(data);
};
