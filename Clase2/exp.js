const estudiantes = ["234234234", "1231231212", "2345532", "12321231"];

// for (let index = 0; index < estudiantes.length; index++) {
//     const element = estudiantes[index];
//     if(element == "Gabriel") {
//         console.log('existe')
//     }

// }
const dni = "234234234";
if (!estudiantes.includes(dni)) {
  console.log("no existe, agregando");
  estudiantes.push(dni);
} else {
  console.log("existe DNI");
}
console.log(estudiantes);
