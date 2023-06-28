import moment from "moment";
const hoy = moment();

const FdN = moment("1999-07-30", "YYYY-MM-DD");
if (FdN.isValid()) {
  console.log("es valido!");
  console.log(
    `han transcurrido ${hoy.diff(FdN, "months")} meses desde mi nacimiento.`
  );
} else {
  console.log("no es valido!");
}
