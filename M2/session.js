import express from "express";
import session from "express-session";

const app = express();
app.use(
  session({
    secret: "43rerw43t43t4tweewrew",

    resave: true,

    saveUninitialized: true,
  })
);
//*** */
app.get("/session", (req, res) => {
  if (req.session.counter) {
    req.session.counter++;
    res.send(`se ha actualizado ${req.session.counter} veces.`);
  } else {
    req.session.counter = 1;
    res.send("bienvenido");
  }
});

//**** */
app.get("/", (req, res) => {
  console.log(req.session);
  const { username, password } = req.query;
  if (username !== "coder" && password !== "12345")
    return res.send("credenciales invalidas!");

  req.session.user = username;

  req.session.isAdmin = true;
  res.redirect("/admin");
});

const auth = (req, res, next) => {
  if (!req.session.isAdmin)
    return res.status(403).send("Credenciales no validas (no es admin)!");

  return next();
};
app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (!err) return res.send("sesion terminada!");
  });
});
app.get("/admin", auth, (req, res) => {
  //  if(!req.session.isAdmin) return res.send('invalido!')
  res.send("hola admin!");
});

app.listen(8081, () => console.log("conectado"));
