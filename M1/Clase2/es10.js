import express from "express";

const hola = "     ";
console.log(hola.trim().length);

const info = {
  id: 1,
  nombre: "Lautaro",
  esEstudiante: true,
  gender: "M",
  notas: [10, 7, 8, 5],
};

if ("notas" in info) {
  const { default: sumar } = await import("./utils");
  sumar(2, 2);
}
