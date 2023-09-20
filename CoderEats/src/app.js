import express from "express";
import UsersRouter from "./routers/users.router.js";
import ShopsRouter from "./routers/shops.router.js";
import OrdersRouter from "./routers/orders.router.js";
const app = express();

app.use(express.json());

app.use("/api/auth", UsersRouter);
app.use("/api/shops", ShopsRouter);
app.use("/api/orders", OrdersRouter);

app.listen(8081, () => console.log(`servidor instanciado`));
