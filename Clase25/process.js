import { Command } from "commander";
import express from "express";

// * process global
process.on("exit", (code) => {
  console.log(`Exit con codigo ${code}`);
});
process.on("uncaughtException", (excpt) => {
  console.log(`Error no manejado: `, excpt.message);
});

process.on("message", (msg) => {
  console.log(`Msg de proceso: ${msg}`);
});

const app = express();

app.get("/", (req, res) => {
  res.send("hola mundo!");
});
console.log(process.argv.slice(2));

// * => envio de mensaje => escucha
// process.on("message", () => {});
// console.log(process.memoryUsage());

const program = new Command();

program
  .option("-p, --port <port>", "Port to init app", 8080)
  .option("-env <env>", "env for app", "development");
program.parse();

const args = program.opts();
console.log(args);
app.listen(args.p, () => console.log(` escuchando en el puerto ${args.p}`));

// * => -p 8081 => {port: 8081}
