import fs from "fs";

// * Sincrono
// fs.writeFileSync('./coder.txt', 'Hola mundo!!!!!')
const info = fs.readFileSync("./coder.txt", "utf-8");
console.log("sync:");
console.log(info);

// * Callback
// ? problemas   Resultado
fs.readFile("./coder.txt", (error, data) => {
  if (error) console.log(error);
  console.log("callback: ");
  const text = data.toString() + "  Hola mundo!";

  fs.writeFile("./coder.txt", text, (error, result) => {
    console.log(result);
  });
});
