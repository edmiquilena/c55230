import { getAllContacts, createContact } from "../services/contact.service.js";
export const GETAllContacts = async (req, res) => {
  const contacts = await getAllContacts();
  res.send({ contacts });
};
export const POSTNewContact = async (req, res) => {
  const newContact = await createContact(req.body);
  return res.send({ newContact });
};

export default class ContactsController {
  constructor() {}

  GETAllContacts = async (req, res) => {
    const contacts = await getAllContacts();
    res.send({ contacts });
  };
  POSTNewContact = async (req, res) => {
    const newContact = await createContact(req.body);
    return res.send({ newContact });
  };
}
