// import DAOFactory from "../dao/index.js";

import { ContactsDAO } from "../dao/index.js";
import ContactDTO, { Contact } from "../dto/contact.dto.js";
// const dao = await DAOFactory()
// const contactsDAO = new dao();
const contactsDAO = new ContactsDAO();
export const getAllContacts = async () => {
  const contacts = await contactsDAO.find();

  return contacts.map((contact) => new Contact(contact));
};

export const createContact = async (contact) => {
  const contactDto = new ContactDTO(contact);
  const newContact = await contactsDAO.create(contactDto);

  return new Contact(newContact.toObject());
};
