import express from "express";
import eventosRouter from "./routes/eventos.js";
import usuariosRouter from "./routes/usuarios.js";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  if (req.ip == "127.0.0.1") {
    res.status(403).send("No permitido");
  } else {
    next();
  }
});
app.use((err, req, res, next) => {
  console.error(err);
  res.send("error!");
});
app.use("/files", express.static("db"));
app.use("/assets", express.static("public"));
app.use("/api/evento", eventosRouter);
app.use("/api/usuario", usuariosRouter);

app.listen(8080, () => {
  console.log("escuchando!");
});
