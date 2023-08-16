import cookieParser from "cookie-parser";
import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import userRouter from "./routes/user.views.js";
import hbs from "express-handlebars";
import mongoose from "mongoose";
const app = express();

// * configuracion de cookies
app.use(cookieParser());

// * body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// * config session
app.use(
  session({
    secret: "superseguronadieve",
    resave: true,
    saveUninitialized: true,
    // * File storage
    // store: new FS({ path: "./sessions" }),
    // * mongo
    store: new MongoStore({
      mongoUrl: `mongodb://127.0.0.1:27017/coderhouse`,
      ttl: 3600,
    }),
    ttl: 3600,
  })
);

// * configuracion handlebars

app.engine("handlebars", hbs.engine());
app.set("views", "./views");
app.set("view engine", "handlebars");

// * mongoose

mongoose.connect(`mongodb://127.0.0.1:27017/coderhouse`);

// * router
app.use("/", userRouter);

app.listen(8081, () => console.log("conectados"));
