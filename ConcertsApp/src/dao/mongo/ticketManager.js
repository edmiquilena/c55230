import ConcertModel from "../../models/concert.model.js";

export default class ConcertManager {
  #precioBaseGanacia = 0.15;

  constructor() {}

  getEventos = async () => ConcertModel.find().populate("participantes.user");

  //* const eventos =

  crearEvento = async ({
    nombre,
    lugar,
    precio,
    capacidad = 50,
    fecha = new Date().toLocaleDateString(),
  }) => {
    const evento = await ConcertModel.create({
      nombre,
      lugar,
      precio: precio + precio * this.#precioBaseGanacia,
      capacidad,
      fecha,
      participantes: [],
    });
    return evento;
  };

  getEventById = async (id) =>
    ConcertModel.findById(id).populate("participantes.user");

  // * id, event (Object)
  updateEventById = async (id, { nombre, lugar, precio, capacidad, fecha }) => {
    const event = await ConcertModel.findById(id);
    if (!event) throw new Error("ID no existe");

    event.nombre = nombre;
    event.lugar = lugar;
    event.precio = precio + precio * this.#precioBaseGanacia;
    event.capacidad = capacidad;
    event.fecha = fecha;
    // * participantes, _id
    await event.save();

    return event;
  };

  deleteEventById = async (id) => ConcertModel.deleteOne({ _id: id });

  async addUserToEvent(concertId, userId) {
    const event = await this.getEventById(concertId);
    if (!event) throw new Error("ID No existe");
    if (!event.participantes.some(({ user }) => user == userId)) {
      event.participantes.push({ user: userId });

      event.save();
    }

    return event;
  }
}

// ***
