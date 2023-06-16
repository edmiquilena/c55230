const user = {
  id: 1,
  nombre: "Matias",
  esEstudiante: true,
  gender: "M",
  notas: [10, 7, 8, 5],
};

//* Object.keys
console.log(Object.keys(user));

// * nullish => undefined null

//* Object.values

console.log(Object.values(user));

//* Object.entries
console.log(Object.entries(user));

Object.entries(user).forEach((info) => {
  //      0      1     [ 'id', 1 ]
  const [key, value] = info;
  console.log(key, value);
});

// rest
const { notas } = user;

console.log({
  // * spread
  ...user,
  nombre: "Juan",
  notas: notas.reduce((pv, cv) => pv + cv, 0) / notas.length,
});
