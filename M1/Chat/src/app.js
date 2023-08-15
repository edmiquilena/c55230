import express from "express";
import { Server as HTTPServer } from "http";
import { Server as SocketIO } from "socket.io";
import handlebars from "express-handlebars";
import __dirname from "./dirname.js";
import { SocketFn } from "./socketHandler.js";
// ? se inicializa express
const app = express();
app.use(express.json());
// * handlebars
// * /?query=iphone&limit=3&sort=asc
//* products/:id

app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

const httpServer = HTTPServer(app);

const io = new SocketIO(httpServer);
app.use(express.static(`${__dirname}/public`));
// * middleware inyeccion socket
app.use((req, res, next) => {
  req.io = io;
  next();
});

app.get("/", (req, res) => {
  res.render("join");
});
app.get("/chat", (req, res) => {
  res.render("chat");
});
app.post("/alertaSistema", (req, res) => {
  const { mensaje } = req.body;
  req.io.emit("recibirMensaje", { text: mensaje, username: "SISTEMA" });
  res.send("mensaje enviado!");
});
//* BACK

const msgDB = [
  { text: "hola mundo!", username: "eduardo" },
  { text: "hola mundo!", username: "Gabriela" },
];

io.use((socket, next) => {
  const { username } = socket.handshake.auth;
  if (!username) next(new Error("Username no existe!"));

  socket.user = { username };
  next();
});
// * cliente

io.on("connection", SocketFn);

httpServer.listen(8080, () => {
  console.log("escuchando en el puerto 8080");
});
