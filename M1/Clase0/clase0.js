console.log({hola: "mundo", estudiante: true})
console.warn([1,2, 3, 4, 5])
console.error("hola mundo! error")


// ? Primitivos

// * String cadena texto
let nombre = "Franklin"
let hola = 'hola '+nombre;
let saludo = `hola ${nombre}`

// * boolean
let esEstudiante = true;
esEstudiante = false;

// * Number
let edad = 23;
// * undefined
// * null


// ? Objetos

let Notas = [10, 8, 5, 7]
const estudiante = {nombre: 'mario', apellido: 'cual', edad: 20, notas: Notas}
// console.log(estudiante)
estudiante.nombre = 'maria'
// console.log(estudiante)
// ?                   0    1   2           3           4
const informacion = [true, 40, "hola", [1, 2, 3], {hola: "mundo"}]

console.log(informacion.toLowerCase())