# Express & socket.io FAQ

## Como Configurar Socket en express

### Metodo 1 (basico)

```js
import express from "express";

import { Server } from "socket.io";

const app = express();

// (...) Rutas, middlewares etc

// * express
const appServer = app.listen(PORT, () => {});

// * wrapper socket.io
const io = new Server(appServer);
```

### Metodo 2: Con modulo HTTP

```js
import express from "express";
import { Server as HTTPServer } from "http";
import { Server as SocketIO } from "socket.io";

// se inicializa express
const app = express();

// * NUEVO: Se utiliza el servicio del mudlo HTTP para iniciar el servidor, en vez del metodo listen de express
const httpServer = HTTPServer(app);

// * wrapper socket.io para el servicio de http
const io = SocketIO(httpServer);

// ** Metodos de socket
// (...)

// (...) Rutas, middlewares etc
httpServer.listen(PUERTO, () => {});
```

### Verificar conexion de socket

Recordemos socket.io inyecta un archivo estatico en `/socket.io/socket.io.js` el cual siempre debe ser accesible, si este archivo no existe, es porque nuestro wrapper de socket no esta funcional!

### Como puedo utilizar el socket dentro de las rutas de express para enviar eventos

Para esto es necesario instanciar el servidor con el **metodo 2 (metodo con HTTP)** (referir a la seccion anterior), ya que necesitamos poder hacer uso del _io_ dentro de las rutas.

Recordemos Express nos permite crear middlewares para poder inyectar contenido en todas las llamadas, y esto lo podemos hacer para siempre tener la conexion del socket en nuestro servicio de express.

El middleware utilizado puede ser el siguiente:

```js
app.use((req, res, next) => {
  req.io = io;
  next();
});
```

**\*Nota:** Recordemos los middlewares tienen que ser llamados antes de usar los routers!\*

Que hace este middleware? toma la constante io, que posee los metodos para interactuar con el socket, y lo asigna al _req_ de la llamada, de esta manera ahora todas las rutas podran usar req.io para emitir mensajes!
por lo tanto puedes tener tu ruta de esta manera:

```js
app.get("/home", (req, res, next) => {
  req.io.emit("evento", "hola soy un evento!");
});
```

cuando el cliente acceda a `/home`, se emitira un evento por el web socket a los demas clientes.

en el archivo `src/socketHttp.js` les he dejado un ejemplo.
