class TicketManager  {

#precioBaseGanacia = 0.15;
// *
// [{id: 1}, {id: 2}, {id: 2}]
constructor() {
this.eventos = [];

}

getEventos = () => {
return this.eventos;
}

agregarEvento = (nombre, lugar, precio, capacidad = 50, fecha = new Date().toLocaleDateString()) => {

    const evento = {
        id: this.eventos.length+1,
        nombre,
         lugar, 
         precio: precio+(precio*this.#precioBaseGanacia), 
         capacidad,
        fecha,
participantes: [],
    }
    this.eventos.push(evento)
    return evento;
    // nombre
    // lugar
    // precio (deberá agregarse un 0.15 del valor original)
    // capacidad (50 por defecto)
    // fecha (hoy por defecto)
    // El método deberá crear además el campo id autoincrementable y el campo “participantes” que siempre iniciará con un arreglo vacío.

}

agregarUsuario (idEvent, idUsuario) {
const eventoIndex = this.eventos.findIndex(event =>event.id===idEvent);
const evento = this.eventos[eventoIndex]
    if(eventoIndex === -1) {
        return "Not found!";

    }

    if(evento.participantes.includes(idUsuario)) {
return "Usuario registrado"
    }
    this.eventos[eventoIndex].participantes.push(idUsuario)

}

ponerEventoEnGira (idEvento,nuevaLocalidad,nuevaFecha){
    const eventoIndex = this.eventos.findIndex(e=>e.id===idEvento);
    if(eventoIndex===-1) {
        console.log("Evento no encontrado");
        return;
    }
    const evento = this.eventos[eventoIndex];
    const newEvento = {
        ...evento,
        lugar:nuevaLocalidad,
        fecha:nuevaFecha,
        id:this.eventos.length+1,
        participantes:[]
    }
    this.eventos.push(newEvento);
}
}
