import mongoose from "mongoose";
/**
 *  id: eventos.length == 0 ? 1 : eventos[eventos.length - 1].id + 1,
        nombre,
        lugar,
        precio: precio + precio * this.#precioBaseGanacia,
        capacidad,
        fecha,
        participantes: [],
 */

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
  },
  fecha: {
    type: String,
    required: true,
  },
  participantes: {
    type: String,
    required: true,
  },
});
const ConcertModel = mongoose.model("tickets", ticketSchema);
export default ConcertModel;
