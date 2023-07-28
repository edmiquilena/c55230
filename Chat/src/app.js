import express from "express";
import { Server as HTTPServer } from "http";
import { Server as SocketIO } from "socket.io";
import handlebars from "express-handlebars";
import __dirname from "./dirname.js";

// ? se inicializa express
const app = express();
app.use(express.json());
// * handlebars

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
io.on("connection", (cliente) => {
  console.log("user", cliente.user.username);
  console.log(`socket conectado: ${cliente.id}`);
  cliente.emit("historial", msgDB);

  cliente.on("enviarMensaje", (data) => {
    console.log(data);
    const { msg, username } = data;
    console.log(msg);
    msgDB.push({ text: msg, username });
    cliente.broadcast.emit("recibirMensaje", { text: msg, username });
  });
});

httpServer.listen(8080, () => {
  console.log("escuchando en el puerto 8080");
});
