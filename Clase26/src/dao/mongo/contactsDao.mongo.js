import contactModel from "../../models/contact.model.js";
export default class ContactsDAO {
  constructor() {}

  async find() {
    const contacts = await contactModel.find();
    return contacts;
  }

  async findById(id) {
    const contact = await contactModel.findById(id);
    return contact;
  }

  async create(contact) {
    const newContact = await contactModel.create(contact);
    return newContact;
  }
}
