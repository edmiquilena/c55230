import express from "express";
import UsersRouter from "./routers/users.router.js";
import ShopsRouter from "./routers/shops.router.js";
import OrdersRouter from "./routers/orders.router.js";
import mongoose from "mongoose";
const app = express();
mongoose.connect("mongodb://127.0.0.1:27017/codereats");
app.use(express.json());

app.use("/api/auth", UsersRouter);
app.use("/api/shops", ShopsRouter);
app.use("/api/orders", OrdersRouter);

app.listen(8081, () => console.log(`servidor instanciado`));
