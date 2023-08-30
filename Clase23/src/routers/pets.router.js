import { Router } from "express";

const router = Router();
const PETS = [];
router.param("pet", (req, res, next, petName) => {
  const pet = PETS.find((pet) => pet.name == petName);
  if (!pet) return res.status(404).send({ msg: "Mascota no existe" });
  req.pet = pet;
  next();
});

router.post("/", (req, res) => {
  const { name, specie } = req.body;
  PETS.push({ name, specie });
  res.send({ msg: "created" });
});

router.get("/:pet([a-zA-Z%20]+)", (req, res) => {
  res.send(req.pet);
});

router.put("/:pet([a-zA-Z%20]+)", (req, res) => {
  const index = PETS.findIndex((pet) => pet.name == req.pet.name);
  PETS[index].adopted = true;

  res.send({ pet: PETS[index] });
});
export default router;
