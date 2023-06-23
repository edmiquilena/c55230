import fs from "fs";

// import fs from "fs/promises"
await fs.promises.writeFile("./fyh.txt", "hola!!");
fs.promises
  .readFile("./fyh.txt", "utf-8")
  .then((data) => console.log(`then data: ${data}`))
  .catch((error) => console.error(`error catch: ${error}`));

try {
  const data = await fs.promises.readFile("./fyh.txt", "utf-8");
  console.log(`awaited data: ${data}`);
} catch (e) {
  console.error(`error awaited: ${e}`);
}
