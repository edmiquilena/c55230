export default class ContactDTO {
  //req.body
  constructor(contact) {
    this.fullName = `${contact.firstName} ${contact.lastName}`;
    this.phoneNumber = contact.phone;
    this.isInternational = contact.phone.startsWith("+");
  }
}

export class Contact {
  constructor(contact) {
    const [firstName, lastName] = contact?.fullName.split(" ");
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = contact.phoneNumber;
  }
}






let username = "eduardo"


username = true;

























