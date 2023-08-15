import express from "express";
import eventosRouter from "./routes/eventos.js";
import eventosViewsRouter from "./routes/eventos.views.js";
import usuariosRouter from "./routes/usuarios.js";
import handlebars from "express-handlebars";
import __dirname from "./dirname.js";
const app = express();
app.use(express.static("public"));
app.engine("handlebars", handlebars.engine());
// * Model View Controller
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

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

// * vistas

app.use("/evento", eventosViewsRouter);

app.listen(8080, () => {
  console.log("escuchando!");
});
