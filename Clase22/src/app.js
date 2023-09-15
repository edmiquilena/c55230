import cookieParser from "cookie-parser";
import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import userRouter from "./routes/user.views.js";
import hbs from "express-handlebars";
import mongoose from "mongoose";
import passport from "passport";
import InitLocalStrategy from "./config/passport.config.js";
import AuthRouter from "./routes/auth.router.js";
import APIRouter from "./routes/user.router.js";
import cors from "cors";
import ENV_CONFIG from "./config/config.js";
const app = express();
app.use(cors());
// * configuracion de cookies
app.use(cookieParser());
// cors
// * body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./public"));
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
      mongoUrl: ENV_CONFIG.MONGO_URI,
      ttl: 3600,
    }),
    ttl: 3600,
  })
);

// * passport init
InitLocalStrategy();
app.use(passport.initialize());
app.use(passport.session());

// * configuracion handlebars

app.engine("handlebars", hbs.engine());
app.set("views", "./views");
app.set("view engine", "handlebars");

// * mongoose

mongoose.connect(ENV_CONFIG.MONGO_URI);

// * router
app.use("/", userRouter);
// app.use("/api/auth", AuthRouter);
app.use("/api", APIRouter);
app.listen(8081, () => console.log("conectados"));
