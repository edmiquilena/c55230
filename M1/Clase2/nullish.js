// * nullish => undefined null
const user = {
  idl: 1,
  nombre: "Matias",
  apellido: null,
  esEstudiante: true,
  gender: "M",
  notas: {},
};
const estudianteApellido =
  user.notas?.programacion ?? "No existe nota para esta asignacion";
console.log(estudianteApellido);
