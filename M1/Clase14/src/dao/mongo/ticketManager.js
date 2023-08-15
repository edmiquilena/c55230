import fs from "fs/promises";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
export default class TicketManager {
  #precioBaseGanacia = 0.15;
  // *
  // [{id: 1}, {id: 2}, {id: 2}]
  constructor(path) {
    this.path = `${__dirname}/db/${path}.json`;
    this.eventos = [];
  }

  // * @util
  async #saveEvent(events) {
    await fs.writeFile(this.path, JSON.stringify(events));
    this.events = events;
    return events;
  }

  getEventos = async () => {
    try {
      const file = await eventModel.find()
      const eventos = JSON.parse(file);
      return eventos;
    } catch (e) {
      await this.#saveEvent([]);
    }
  };
  // ? agregarEvento(lugar, precio, capacidad)
  agregarEvento = async (evento) => {
    const {
      nombre,
      lugar,
      precio,
      capacidad = 50,
      fecha = new Date().toLocaleDateString(),
    } = evento;

    try {
      const eventos = await this.getEventos();
      const evento = {
        id: eventos.length == 0 ? 1 : eventos[eventos.length - 1].id + 1,
        nombre,
        lugar,
        precio: precio + precio * this.#precioBaseGanacia,
        capacidad,
        fecha,
        participantes: [],
      };

      this.eventos = eventos;
      eventos.push(evento);
      await this.#saveEvent(eventos);
      return evento;
    } catch (e) {
      console.log(e);
    }
  };

  async agregarUsuario(idEvent, idUsuario) {
    const eventos = await this.getEventos();
    const eventoIndex = eventos.findIndex((event) => event.id === idEvent);
    const evento = eventos[eventoIndex];
    if (eventoIndex === -1) {
      return "Not found!";
    }

    if (evento.participantes.includes(idUsuario)) {
      return "Usuario registrado";
    }
    eventos[eventoIndex].participantes.push(idUsuario);
    await this.#saveEvent(eventos);
  }

  async eventById(idEvent) {
    const eventos = await this.getEventos();
    const evento = eventos.find((event) => event.id == idEvent);
    return evento;
  }

  async editEventById(idEvent, evento) {
    const eventos = await this.getEventos();
    const eventoIndex = eventos.findIndex((evento) => evento.id == idEvent);
    if (eventoIndex == -1) return false;

    eventos[eventoIndex] = {
      ...eventos[eventoIndex],
      ...evento,
      precio: evento.precio + evento.precio * this.#precioBaseGanacia,
    };

    await this.#saveEvent(eventos);
  }
  async deleteAll() {
    await this.#saveEvent([]);
  }
  async deleteEventById(idEvent) {
    const eventos = await this.getEventos();
    const newEvents = eventos.filter((event) => event.id != idEvent);
    await this.#saveEvent(newEvents);
  }

  async ponerEventoEnGira(idEvento, nuevaLocalidad, nuevaFecha) {
    const eventos = await this.getEventos();
    const participanteFn = (participante) => {};
    const eventoFn = (evento) => {
      return evento.participantes.map(participanteFn);
    };

    const eventoIndex = eventos.map(eventoFn);
    if (eventoIndex === -1) {
      console.log("Evento no encontrado");
      return;
    }
    const evento = eventos[eventoIndex];
    const newEvento = {
      ...evento,
      lugar: nuevaLocalidad,
      fecha: nuevaFecha,
      id: eventos.length == 0 ? 1 : eventos[eventos.length - 1].id + 1,
      participantes: [],
    };
    eventos.push(newEvento);
    await this.#saveEvent(eventos);
  }
}
