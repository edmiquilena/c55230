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
const app = express();
// * configuracion de cookies
app.use(cookieParser());

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
      mongoUrl: `mongodb://127.0.0.1:27017/coderhouse`,
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

mongoose.connect(`mongodb://127.0.0.1:27017/coderhouse`);

// * router
app.use("/", userRouter);
// app.use("/api/auth", AuthRouter);
app.use("/api", APIRouter);
app.listen(8081, () => console.log("conectados"));
