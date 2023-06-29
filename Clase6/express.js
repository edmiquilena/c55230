import express from "express";

const app = express();

//*request response
app.get("/hola", (req, res) => {
  res.send(`<h1>Hola mundo!</h1>`);
});
app.get("/usuario", (req, res) => {
  res.send({
    nombre: "Eduardo",
    estudiante: true,
    calificacion: 10,
    calificaciones: [1, 3, 4, 5],
  });
});
app.post("/hola", (req, res) => {
  res.send("hola mundo post!");
});

app.put("/hola", (req, res) => {
  res.send("hola mundo put!");
});

app.listen(8080, () => {
  console.log("escuchando en el puerto 8080!");
});
