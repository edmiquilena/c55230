import express from "express";
import DictionaryRouter from "./routers/dictionary.router.js";
import PetsRouter from "./routers/pets.router.js";
import UserRouter from "./routers/user.router.js";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());
//dictionary
app.use("/dictionary", DictionaryRouter);
app.use("/pet", PetsRouter);
const userRouter = new UserRouter();
app.use("/api/auth", userRouter.getRouter());
app.listen(8082, () => console.log("conectados!"));
