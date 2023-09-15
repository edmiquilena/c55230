import express from "express";
import ToyRouter from "./routers/toy.router.js";
import ContactRouter from "./routers/contacts.router.js";
import mongoose from "mongoose";
const app = express();
app.use(express.json());

app.use("/toy", ToyRouter);
app.use("/contact", ContactRouter);
// app.use("/user");

app.listen(8080, () => console.log(`Connected on port 8080`));
