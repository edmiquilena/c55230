import mongoose from "mongoose";
import UserModel from "./user.model.js";
const ticketSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  lugar: {
    type: String,
    required: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  capacidad: {
    type: Number,
    required: true,
    default: 1000,
  },
  fecha: {
    type: String,
    required: true,
  },
  // [{user: "64dc0b3171e44172ab85edec"}, {user:"_id"}, {user:"_id"}]
  participantes: {
    type: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
        },
        // qty: number
      },
    ],
    required: true,
    default: [],
  },
});
// .populate('participantes.user')
// concert.participantes.push({user: _id})
const ConcertModel = mongoose.model("ticket", ticketSchema);
export default ConcertModel;
