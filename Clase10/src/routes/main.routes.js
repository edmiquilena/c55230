import { Router } from "express";

const app = Router();
app.get("/", (req, res) => {
  res.render("index");
});

app.post("/alertar", (req, res) => {
  // * Tomamos de muestra, al enviar en el body un mensaje, se distribuye a todos los clientes de socket
  const { mensaje } = req.body;
  // * Pueden notar que ya se hace uso del req.io creado en el middleware
  req.io.emit("recibirZumbido", mensaje);
  res.send("mensaje enviado!");
});
export default app;
