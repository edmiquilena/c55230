import { Router } from "express";
import * as OrdersController from "../controllers/orders.controller.js";
const router = Router();

router.get("/", OrdersController.GETOrders);

router.get("/:orderId", OrdersController.GETOrderById);

router.post("/", OrdersController.POSTNewOrder);

router.put("/:orderId/product", OrdersController.PUTNewProduct);

export default router;
