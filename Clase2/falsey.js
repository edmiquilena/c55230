// * undefined, null, false, 0,  ""   => falsey

const user = {
  idl: 1,
  nombre: "Matias",
  apellido: null,
  esEstudiante: true,
  gender: "M",
  notas: false,
};
// falsey
const estudianteApellido = user.notas ?? "No existe nota para esta asignacion";
console.log(estudianteApellido);
