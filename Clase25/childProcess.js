function fn() {
  return result;
}
console.log(process.pid);
process.on("message", (message) => {
  let result = 0;
  for (let index = 0; index < 10e9; index++) {
    result += index;
  }
  process.send(result);
});
