import express from "express";
import { Server as HTTPServer } from "http";
import { Server as SocketIO } from "socket.io";
import handlebars from "express-handlebars";
import mainRouter from "./routes/main.routes.js";
import __dirname from "./dirname.js";
// se inicializa express
const app = express();

// * configuracion handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

// * contenido estatico
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// * NUEVO: Se utiliza el servicio del modulo HTTP para iniciar el servidor, en vez del metodo listen de express
const httpServer = HTTPServer(app);

// * wrapper socket.io para el servicio de http
const io = new SocketIO(httpServer);

//* middleware de socket
app.use((req, res, next) => {
  req.io = io;
  next();
});

// * endpoints o use() de enrutadores
app.use("/", mainRouter);

// * Metodos socket
io.on("connection", (socket) => {
  console.log(`cliente se ha conectado, ID ${socket.id}`);

  socket.emit("saludo", "hola");
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

// * listen del servidor
httpServer.listen(8080, () => {});
