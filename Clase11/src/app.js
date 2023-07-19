import express from "express";
import { Server as HTTPServer } from "http";
import { Server as SocketIO } from "socket.io";
import handlebars from "express-handlebars";
// ? se inicializa express
const app = express();

// * handlebars

app.engine("handlebars", handlebars.engine());
app.set("views", `./views`);
app.set("view engine", "handlebars");

const httpServer = HTTPServer(app);

const io = new SocketIO(httpServer);
app.use(express.static("./public"));
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

//* BACK

const msgDB = [
  { text: "hola mundo!", username: "eduardo" },
  { text: "hola mundo!", username: "Gabriela" },
];

io.on("connection", (socket) => {
  console.log(`socket conectado: ${socket.id}`);
  socket.emit("historial", msgDB);

  socket.on("enviarMensaje", (msg) => {
    console.log(msg);
    msgDB.push({ text: msg, username: socket.id });
    socket.broadcast.emit("recibirMensaje", { text: msg, username: socket.id });
  });
});

httpServer.listen(8080, () => {});
