import { Router } from "express";
import * as ShopsController from "../controllers/shops.controller.js";
const router = Router();

router.get("/", ShopsController.GETShops);

router.get("/:shopId", ShopsController.GETShopById);

router.post("/", ShopsController.POSTNewShop);

router.put("/:shopId", ShopsController.PUTNewProduct);

export default router;
