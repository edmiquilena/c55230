/**
 * CALCULADORA POSITIVA CON PROMESAS

** Definir función suma:
Debe devolver una promesa que se resuelva siempre que ninguno de los dos sumandos sea 0
En caso de que algún sumando sea 0, rechazar la promesa indicando “Operación innecesaria”.
** Definir función resta:
Debe devolver una promesa que se resuelva siempre que ninguno de los dos valores sea 0
En caso de que el minuendo o sustraendo sea 0, rechazar la promesa indicando “Operación inválida
En caso de que el valor de la resta sea menor que 0, rechazar la promesa indicando “La calculadora sólo puede devolver valores positivos”

** Definir una función multiplicación:
Debe devolver una promesa que se resuelva siempre que ninguno de los dos factores sea negativo
Si el producto es negativo, rechazar la oferta indicando “La calculadora sólo puede devolver valores positivos
Definir la misma función división utilizada en esta clase.
Definir una función asíncrona “cálculos”, y realizar pruebas utilizando async/await y try/catch

 */

// => API /sumar
const suma = (a, b) => {
  return new Promise((resolve, reject) => {
    if (a === 0 || b === 0) reject("Operación innecesaria");
    // if((a+b) < 0) reject('La calculadora sólo puede devolver valores positivos')
    resolve(a + b);
  });
};

const resta = (a, b) => {
  return new Promise((resolve, reject) => {
    if (a === 0 || b === 0) reject("Operación innecesaria");
    if (a - b < 0)
      reject("La calculadora sólo puede devolver valores positivos");
    resolve(a - b);
  });
};

const mult = (a, b) => {
  return new Promise((resolve, reject) => {
    if (a < 0 || b < 0) reject("Operación innecesaria");
    if (a - b < 0)
      reject("La calculadora sólo puede devolver valores positivos");
    resolve(a - b);
  });
};

const Fn = async () => {
  try {
    // * then
    const result = await suma(1, 2);
    console.log(result);
    const resResta = await resta(3, 1);
    console.log(resResta);
    console.log("hola mundo!");
  } catch (e) {
    // ! catch
    console.log("error", e);
  }
  // ? finally
  console.log("final!");
};
Fn();
