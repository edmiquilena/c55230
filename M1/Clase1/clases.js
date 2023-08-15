// *  Declaracion de clases

class Phone {
  static owner = "iPhone ";
  constructor(owner) {
    this.owner = owner;
  }

  saludo() {
    return `iPhone de ${this.owner} (${Phone.OS()})`;
  }
  renombrar(nuevoNombre) {
    this.owner = nuevoNombre;
  }

  llamar() {
    return this.saludo();
  }
  static OS() {
    return "16.0";
  }
}

const phone = {
  carolina: {
    owner: "Carolina",
    llamar: "",
    renombrar: "",
  },
  OS: "16.0",
};

console.log(Phone.OS());
//
const estudiante = new Phone("Ernesto").llamar();
console.log(estudiante.llamar());
estudiante.renombrar("Valentin");
console.log(estudiante.llamar());
