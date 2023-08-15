// * declarando una "persistencia" en memoria
// * var, let, co nst => memoria
const users = [
  // * array
  { id: 1, nombre: "Matias", esEstudiante: true, gender: "M" }, // * Object
  { id: 2, nombre: "Osvaldo", esEstudiante: true, gender: "M" }, // * Object
  { id: 3, nombre: "Juliana", esEstudiante: true, gender: "F" }, // * Object
  { id: 3, esEstudiante: true, gender: "F" }, // * Object
];
// console.log(users)
users[0] = { id: 1, nombre: "Lautaro", esEstudiante: true, gender: "M" };
// console.log(users)

users.find(function (user) {});

// * global
{
  {
  }
}

// users = [];

// console.log(users)

function sumar(a, b) {
  return a + b;
}

// *                = >
const Sumar = (a, b) => {};

const valor = Sumar(5, 7);

// {
//     const valor = Sumar(8, 7)
//   console.log(valor)
// }

const obj = { nombre: "eduardo" };

// * Template string
const nombre = `Hola ${obj.nombre}`;
console.log(nombre);
