import EventInterface from "./event.interface";
import EventHandlerInterface from "./event-handler.interface";

/* Essa interface descreverá o contrato que todos os "Event Dispatcher" deverão
* seguir. */
export default interface EventDispatcherInterface {


    notify(event: EventInterface): void;

    /* Esse método permitirá o registro do evento e o handler desse evento, ou
    * seja, passaremos o "userCreated" e a classe do handler que será executado
    * quando esse evento acontecer. */
    register(eventName: string, eventHandler: EventHandlerInterface): void;

    /* Esse método permitirá que tiremos o registro de um determinado evento. */
    unregister(eventName: string, eventHandler: EventHandlerInterface): void;

    /* Esse método tirará o registro de todos os eventos. */
    unregisterAll(): void;
}
