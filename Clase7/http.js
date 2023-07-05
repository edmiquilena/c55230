import http from "http";
//*              https => SSL
// ? request, response
const server = http.createServer((request, response) => {
  const { url, method } = request;
  switch (url) {
    case "/hola":
      switch (method) {
        default:
        case "GET":
          response.end("Hola mundo!");
        case "POST":
          response.end("Hola mundo post!");

          break;
      }
    case "/hola":
      response.end("Hola mundo!");
      break;
    case "/hola":
      response.end("Hola mundo!");
      break;
    case "/hola":
      response.end("Hola mundo!");
      break;
    case "/hola":
      response.end("Hola mundo!");
      break;

    default:
      response.end("Hola soy un servidor http!");
  }
});

server.listen(8080, () => {
  console.log("Escuchando en el puerto 8080!");
});
