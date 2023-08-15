import express from "express";
import TicketManager from "./ticketManager.js";
const ticketManager = new TicketManager("tickets");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// * GET ALL
app.get("/api/evento", async (req, res) => {
  try {
    const eventos = await ticketManager.getEventos();
    res.send(eventos);
  } catch (e) {
    res.status(502).send({ error: true });
  }
});
// * POST: Crear evento
app.post("/api/evento", async (req, res) => {
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

// * PUT: editar evento by ID
app.put("/api/evento/:eventId", async (req, res) => {
  try {
    const { eventId } = req.params;
    const evento = req.body;
    const result = await ticketManager.editEventById(eventId, evento);
    res.send({ update: true });
  } catch (e) {
    res.status(502).send({ error: true });
  }
});

// * GET BY ID
app.get("/api/evento/:eventId", async (req, res) => {
  try {
    const { eventId } = req.params;
    const evento = await ticketManager.eventById(eventId);
    res.send(evento);
  } catch (e) {
    res.status(502).send({ error: true });
  }
});

// * DELETE BY ID

app.delete("/api/evento/:eventId", async (req, res) => {
  try {
    const { eventId } = req.params;
    await ticketManager.deleteEventById(eventId);
    res.send({ deleted: true });
  } catch (e) {
    res.status(502).send({ error: true });
  }
});

// * DELETE ALL
app.delete("/api/evento", async (req, res) => {
  await ticketManager.deleteAll();
  res.send({ deleted: true });
});
app.listen(8080, () => {
  console.log("escuchando!");
});
