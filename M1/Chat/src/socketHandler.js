const enviarMensajeFn = (data) => {
    console.log(data);
    const { msg, username } = data;
    console.log(msg);
    msgDB.push({ text: msg, username });
    cliente.broadcast.emit("recibirMensaje", { text: msg, username });
  }


  
export const SocketFn = (cliente) => {
  console.log("user", cliente.user.username);
  console.log(`socket conectado: ${cliente.id}`);
  cliente.emit("historial", msgDB);

  cliente.on("enviarMensaje", enviarMensajeFn);
};
