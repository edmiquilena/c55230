import { Router } from "express";
const router = Router();

router.get("/api/evento", async (req, res) => {
  try {
    const eventos = await ticketManager.getEventos();
    res.send(eventos);
  } catch (e) {
    res.status(502).send({ error: true });
  }
});

router.post("/api/evento", async (req, res) => {
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

export default router;
