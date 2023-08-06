import EventInterface from "./event.interface";

/* Estamos definindo que o método "handle" receberá um evento que implementa
* o "EventInterface". */
export default interface EventHandlerInterface<T extends EventInterface = EventInterface> {

    /* Vamos criar diversos tipos de eventos que poderão ser recebidos aqui. */

    handle(event: T): void;
}
