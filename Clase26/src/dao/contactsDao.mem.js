export default class ContactsDAO {
  constructor() {
    this.db = [];
  }

  async find() {
    return this.db;
  }

  async findById(id) {
    return this.db.find((entry) => entry.id == id);
  }
  async create(contact) {
    this.db.push({ ...contact, id: this.db.length + 1 });
    return this.db[this.db.length - 1];
  }
}
