import express from "express";
import handlebars from "express-handlebars";
import __dirname from "./dirname.js";
const app = express();

app.engine("handlebars", handlebars.engine());

app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
  const { nombre } = req.query;
  for (let index = 0; index < 100000; index++) {
    console.log(index);
  }
  res.render("index", {
    nombre: nombre,
    comision: 55230,
    link: "https://google.com",
  });
});

const users = [
  {
    nombre: "Usuario 1",
    apellido: "Apellido 1",
    edad: 20,
    correo: "usuario@gmail.com",
    telf: "123321312231",
  },
  {
    nombre: "Usuario 2",
    apellido: "Apellido 2",
    edad: 30,
    correo: "usuario2@gmail.com",
    telf: "42332342423",
  },
  {
    nombre: "Usuario 3",
    apellido: "Apellido 3",
    edad: 40,
    correo: "usuario3@gmail.com",
    telf: "32423423423432",
  },
];

app.get("/me", (req, res) => {
  const index = Math.floor(Math.random() * users.length);
  res.render("users", {
    user: users[index],
  });
});
app.listen(8080, () => console.log("conectados"));
