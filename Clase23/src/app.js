import express from "express";
import DictionaryRouter from "./routers/dictionary.router.js";
import PetsRouter from "./routers/pets.router.js";
import UserRouter from "./routers/user.router.js";
const app = express();
app.use(express.json());
//dictionary
app.use("/dictionary", DictionaryRouter);
app.use("/pet", PetsRouter);
const userRouter = new UserRouter();
app.use("/user", userRouter.getRouter());
app.listen(8081, () => console.log("conectados!"));
