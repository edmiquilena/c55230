import express from "express";
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser("398h8392ehe382hdqoqwiewqw"));

app.get("/", (req, res) => {
  console.log(req.cookies);
  console.log(req.signedCookies);
  res.send({ cookies: req.cookies, signed: req.signedCookies });
  //     // * '?nombre=eduardo&apellido=32132'
  // / **
  // {nombre: 'eduardo'}
});

app.get("/setCookie", (req, res) => {
  res
    .cookie("superCookie", "rica galleta!", { maxAge: 200000000, signed: true })
    .send("ver cookies!");
});
app.get("/delete", (req, res) => {
  res.clearCookie("superCookie").send("cookie eliminada!");
});

app.listen(8081, () => console.log("escuchando!"));
