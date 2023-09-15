/**
 * ? TOY ROUTER
 */
import { Router } from "express";
import * as ToyController from "../controllers/toy.controller.js";
const ToyRouter = Router();

ToyRouter.get("/", ToyController.GETAllToys);

ToyRouter.get("/:id", ToyController.GETToyById);

ToyRouter.post("/", ToyController.POSTNewToy);

export default ToyRouter;
