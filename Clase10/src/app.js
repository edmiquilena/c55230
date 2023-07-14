import express from "express";
import handlebars from "express-handlebars";
import { Server as SocketServer } from "socket.io";
const app = express();

// * dirname
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// * handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

// * contenido estatico

app.use(express.static(`${__dirname}/public`));

app.get("/", (req, res) => {
  res.render("index");
});

// * inicializacion de express
const appServer = app.listen(8080, () => console.log(`conectados!`));

// * wrapper socketio

const io = new SocketServer(appServer);
// ? Para trabajar con websockets => socketServer
// ? para express => appServer
// * Conexion con el cliente
io.on("connection", (socket) => {
  console.log(`cliente se ha conectado, ID ${socket.id}`);

  socket.emit("saludo", productsList);
  socket.on("saludoserver", (data) => {
    console.log(`mensaje del cliente: ${data}`);
  });
  socket.on("zumbido", (mensaje) => {
    console.log("emitiendo..");
    // * todos menos el cliente que envia
    socket.broadcast.emit("recibirZumbido", mensaje);
    // * solo al cliente que envia
    socket.emit();

    // * todos los clientes conectados
    //  io.emit("recibirZumbido", {});
  });
  // socket.on();
});
