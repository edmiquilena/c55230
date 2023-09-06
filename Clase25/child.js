import express from "express";
import fork from "node:child_process";
const app = express();
console.log(fork);
app.get("/no-bloq", (req, res) => {
  // node childProcess.js
  const child = fork.fork("./childProcess.js");

  child.send("INIT");

  child.on("message", (result) => {
    res.send(`resultado: ${result}`);
  });
});

app.get("/bloq", (req, res) => {
  let result = 0;
  for (let index = 0; index < 10e9; index++) {
    result += index;
  }
  res.send(result);
});

app.listen(8080);
