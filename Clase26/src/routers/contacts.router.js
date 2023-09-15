import { Router } from "express";
import {
  GETAllContacts,
  POSTNewContact,
} from "../controllers/contact.controller.js";

const router = Router();

router.get("/", GETAllContacts);
router.post("/", POSTNewContact);
export default router;
