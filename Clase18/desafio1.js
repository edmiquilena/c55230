import express from "express";
import cookieParser from "cookie-parser";
import handlebars from "express-handlebars";

const app = express();

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", handlebars.engine());
app.set("views", "./views");
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
  console.log(req.cookies);
  const { user = null } = req.cookies;
  if (!user) res.render("form");
  else res.render("home");
});

// * json
// * form/data => correo=hola@mundo.com
app.post("/", (req, res) => {
  const { correo } = req.body;
  res.cookie("user", correo, { maxAge: 10000 }).redirect("/");
});
app.listen(8081, () => console.log("conectado!"));
