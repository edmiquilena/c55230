import mongoose from "mongoose";
import ConcertModel from "./model/concert.model.js";
import { bands, places } from "./utils/concerts.js";
import moment from "moment";

mongoose.connect("mongodb://127.0.0.1:27017/coderhouse");
const stadiums = Object.keys(places);
for (let index = 0; index < 20; index++) {
  const nameId = Math.floor(Math.random() * bands.length);
  const concert = new ConcertModel();
  concert.nombre = bands[nameId].name;
  concert.lugar = stadiums[Math.floor(Math.random() * stadiums.length)];
  concert.precio = Math.floor(Math.random() * 100 + 1);

  await concert.save();
}
