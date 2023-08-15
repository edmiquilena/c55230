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

const DividirFn = async () => {
  try {
    const res = await dividir(100, 2);
    const res2 = await dividir(res, 0);
    const res3 = await dividir(res2, 2);
    console.log(res3);
  } catch (e) {
    console.log(`Error:${e}`);
  }
};

DividirFn();
