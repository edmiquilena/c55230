import { Router } from "express";
import TicketManager from "../ticketManager.js";
const ticketManager = new TicketManager("tickets");
const eventosRouter = Router();

const AuthMw = (req, res, next) => {
  if (req.query.fuera) {
    res.send("Sal!");
  } else {
    next();
  }
};
eventosRouter.use(AuthMw);

eventosRouter.get("/", AuthMw, async (req, res) => {
  try {
    const eventos = await ticketManager.getEventos();
    res.send(eventos);
  } catch (e) {
    res.status(502).send({ error: true });
  }
});

eventosRouter.post("/", async (req, res) => {
  const body = req.body;
  if (!body.nombre || !body.lugar || !body.precio) {
    res.send({ error: true, msg: "Contenido faltante" });
  } else {
    // res.send(body);
    try {
      // *****************************************  ++ evento
      const result = await ticketManager.agregarEvento(body);
      res.send(result);
    } catch (e) {
      console.log(e);
      res.status(502).send({ error: true });
    }
  }
});

eventosRouter.put("/:eventId", async (req, res) => {
  try {
    const { eventId } = req.params;
    const evento = req.body;
    const result = await ticketManager.editEventById(eventId, evento);
    res.send({ update: true });
  } catch (e) {
    res.status(502).send({ error: true });
  }
});

eventosRouter.get("/:eventId", async (req, res) => {
  try {
    const { eventId } = req.params;
    const evento = await ticketManager.eventById(eventId);
    res.send(evento);
  } catch (e) {
    res.status(502).send({ error: true });
  }
});

eventosRouter.delete("/:eventId", async (req, res) => {
  try {
    const { eventId } = req.params;
    await ticketManager.deleteEventById(eventId);
    res.send({ deleted: true });
  } catch (e) {
    res.status(502).send({ error: true });
  }
});
eventosRouter.delete("/", async (req, res) => {
  await ticketManager.deleteAll();
  res.send({ deleted: true });
});
export default eventosRouter;
