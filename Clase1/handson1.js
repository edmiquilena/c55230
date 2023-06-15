// Consigna:

// Definiremos la función “mostrarLista”, la cual recibirá un arreglo con elementos como parámetro.

// * Si la lista está vacía, devolver un mensaje indicando “Lista vacía”.
// * Si la lista cuenta con elementos, mostrarlos 1 por 1 en consola. Finalizar el proceso indicando la longitud de la lista (Utilizar template strings)


const mostrarLista = (elementos) => {
    // * TRUE
    if(elementos.length === 0) {

     return "Lista vacía" 
} else {

   elementos.forEach((valor) => console.log(valor))

   return `posee: ${elementos.length}`
}
}
const lista = mostrarLista([1,2,3]);
console.log()