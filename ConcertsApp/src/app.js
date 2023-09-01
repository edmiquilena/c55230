import express from "express";
import ConcertRouter from "./routers/concert.router.js";
import mongoose from "mongoose";
import UserRouter from "./routers/user.router.js";
import passport from "passport";
import InitPassportStrategies from "./config/passport.config.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
const app = express();
app.use(cookieParser());
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
app.use(express.json());
mongoose.connect("mongodb://127.0.0.1:27017/coderhouse");

InitPassportStrategies();
app.use(passport.initialize());
app.use(passport.session());
app.use("/api/auth", UserRouter);
app.use("/api/concert", ConcertRouter);

app.listen(8082, () => console.log("conectados!"));
