import express from "express";
import eventosRouter from "./routes/eventos.js";
import usuariosRouter from "./routes/usuarios.js";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use("/api/evento", eventosRouter);
app.use("/api/usuario", usuariosRouter);

app.listen(8080, () => {
  console.log("escuchando!");
});
