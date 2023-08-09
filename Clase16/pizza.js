import mongoose from "mongoose";
const data = [
  {
    name: "Pepperoni",
    size: "small",
    price: 19,
    quantity: 10,
    date: "2021-03-13T08:14:30Z",
  },
  {
    name: "Pepperoni",
    size: "medium",
    price: 20,
    quantity: 20,
    date: "2021-03-13T09:13:24Z",
  },
  {
    name: "Pepperoni",
    size: "large",
    price: 21,
    quantity: 30,
    date: "2021-03-17T09:22:12Z",
  },
  {
    name: "Cheese",
    size: "small",
    price: 12,
    quantity: 15,
    date: "2021-03-13T11:21:39.736Z",
  },
  {
    name: "Cheese",
    size: "medium",
    price: 13,
    quantity: 50,
    date: "2022-01-12T21:23:13.3317",
  },
  {
    name: "Cheese",
    size: "large",
    price: 14,
    quantity: 10,
    date: "2022-01-12T05:08:13Z",
  },
  {
    name: "Vegan",
    size: "small",
    price: 17,
    quantity: 10,
    date: "2021-01-13T05:08:13Z",
  },
  {
    name: "Vegan",
    size: "medium",
    price: 18,
    quantity: 10,
    date: "2021-01-13T05:10:13Z",
  },
];
const pizzaSchema = new mongoose.Schema({
  name: String,
  size: {
    type: String,
    enum: ["small", "medium", "large"],
    default: "small",
  },
  price: Number,
  quantity: Number,
  Date: Date,
});

const pizzaModel = mongoose.model("pizza", pizzaSchema);

mongoose.connect(`mongodb://127.0.0.1:27017/coderhouse`);
// ? Total: 16 pizzas
// const res = await pizzaModel.insertMany(data);

// const res= await pizzaModel.find({size: 'medium'}, )
// res.reduce()

const mediumOrders = await pizzaModel.aggregate([
  // * filtrar por tama;o  "medium"
  {
    $match: { size: "medium" },
  },

  // * agrugar por sabor (name) obtener cantidad c/u
  {
    $group: { _id: "$name", totalPizzas: { $sum: "$quantity" } },
  },

  // * ordenar mayor a menor
  {
    $sort: { totalPizzas: -1 },
  },

  // * agrugar por arreglo a documento
  {
    $group: { _id: 1, orders: { $push: "$$ROOT" } },
  },

  // * $project para convertirlo a documento con _id generado

  {
    $project: {
      _id: 0,
      orders: "$orders",
    },
  },
  // * $merge => creacion de coleccion para documento
  {
    $merge: {
      into: "reports",
    },
  },
]);
// * this.quantity this.name
console.log(mediumOrders);
