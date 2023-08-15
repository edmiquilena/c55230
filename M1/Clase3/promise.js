const dividir = (a, b) => {
  console.log(`division de ${a} y ${b}`, new Date().toLocaleString());
  //* yay!   nay
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (b == 0) {
        reject("No se puede dividir entre 0");
      }
      resolve(a / b);
    }, 1000);
  });
};
console.log("proceso iniciado!");
dividir(100, 2)
  .then((res) =>
    dividir(res, 2).then((res2) =>
      dividir(res2, 2).then((res3) => console.log(res3))
    )
  )
  .catch((res) => console.log(`Error: ${res}`))
  .finally((res) => console.log("promesa terminada!"));

console.log("proceso finalizado!");
