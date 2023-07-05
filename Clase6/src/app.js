import express from "express";
import userManager from "../../Clase5/handson.js";
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const manager = new userManager("./usuarios.json");
// ? => /evento/:id
// * => /evento/3
app.get("/usuarios", async (req, res) => {
  const usuarios = await manager.getUsuarios();

  res.send(usuarios);
});
// * GET, POST, PUT, DELETE, (PATCH)
app.get("/api/usuario/obtener", async (req, res) => {
  const { calificacion } = req.query;
  const usuarios = await manager.getUsuarios();

  res.send(
    calificacion
      ? usuarios.filter(
          (usuario) => usuario.calificacion.toString() === calificacion
        )
      : usuarios
  );
});

app.get("/api/usuario/:usuarioId", async (req, res) => {
  const { usuarioId } = req.params;
  console.log(req.query);
  // *   const { usuarioId } = req.query; // {ocultarPass: true, hola: mundo, y:true}
  const usuarios = await manager.getUsuarios();

  res.send(usuarios.find((usuario) => usuario.id.toString() === usuarioId));
});

////////// **

// * POST

app.post("/usuario", async (req, res) => {
  const { body } = req;
  await manager.crearUsuario(body);
  res.send(body);
});

app.listen(8080, () => {
  console.log("conectados!");
});
