let i = 0;
setInterval(() => {
  i++;
  console.log(`vuelta ${i}`);
}, 0);
console.log("1");
setTimeout(() => {
  console.log("2");
}, 500);
console.log("3");
setTimeout(() => {
  console.log("4");
}, 0);

console.log("5");
