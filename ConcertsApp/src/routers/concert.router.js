import { Router } from "express";
import ConcertManager from "../dao/mongo/ticketManager.js";
import passportMW from "../utils/passport.middlware.js";
import requiresRole from "../utils/protect.middleware.js";
const concertRouter = Router();
const Concert = new ConcertManager();
// * TODOS
concertRouter.get("/", async (req, res) => {
  const concerts = await Concert.getEventos();
  res.send({ concerts });
});

// * CONCIERTO ID
concertRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const concert = await Concert.getEventById(id);
  res.send({ concert });
});

// * POST CREAR

concertRouter.post("/", passportMW("jwt"), async (req, res) => {
  const { nombre, lugar, precio, capacidad, fecha } = req.body;
  const createConcert = await Concert.crearEvento({
    nombre,
    lugar,
    precio,
    capacidad,
    fecha,
  });
  res.send({ concert: createConcert });
});
concertRouter.put("/ticket/:concertId", passportMW("jwt"), async (req, res) => {
  try {
    const { concertId } = req.params;

    const updatedConcert = Concert.addUserToEvent(concertId, req.user._id);

    res.send({ concert: updatedConcert });
  } catch (e) {
    console.log(e.message);
    res.send({ error: true });
  }
});

// * PUT Agregar a participantes
concertRouter.put(
  "/:concertId/:userId",
  passportMW("jwt"),
  requiresRole("admin"),
  async (req, res) => {
    const { concertId, userId } = req.params;
    const updatedConcert = Concert.addUserToEvent(concertId, userId);

    res.send({ concert: updatedConcert });
  }
);

//

export default concertRouter;
