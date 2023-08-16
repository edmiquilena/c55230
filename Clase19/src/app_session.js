import cookieParser from "cookie-parser";
import express from "express";
import session from "express-session";
import sessionFileStore from "session-file-store";
import MongoStore from "connect-mongo";
const app = express();
const FS = sessionFileStore(session);
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
      ttl: 30,
    }),
    ttl: 30,
  })
);
app.get("/", (req, res) => {
  req.session.user = "ed";
  res.send("hola mundo!");
});
app.get("/session", (req, res) => {
  if (req.session.counter) {
    req.session.counter++;
    res.send(`se ha actualizado ${req.session.counter} veces.`);
  } else {
    req.session.counter = 1;
    res.send("bienvenido");
  }
});
app.get("/getSession", (req, res) => {
  res.send(req.session);
});
app.listen(8081, () => console.log("conectados"));
