// * conexion socket
// * FRONT estatico
// import io from "socket.io"
console.log("hola front!");
const socket = io();

socket.on("saludo", (data) => {
  console.log(`mensaje del servidor: ${data}`);
});

socket.emit("saludoserver", "saludos desde el cliente");
socket.on("recibirZumbido", (data) => {
  let audio = document.getElementById("audio");
  audio.play();
  let log = document.getElementById("log");
  log.innerHTML += "<div>" + data + "</div>";
});
function alertar() {
  let input = document.getElementById("textbox");
  socket.emit("zumbido", input.value);
}
