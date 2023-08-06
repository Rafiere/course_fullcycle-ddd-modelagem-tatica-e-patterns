import EventDispatcherInterface from "./event-dispatcher.interface";
import EventInterface from "./event.interface";
import EventHandlerInterface from "./event-handler.interface";

export default class EventDispatcher implements EventDispatcherInterface {

    /* Abaixo, temos uma lista de Event Handlers que estão registrados nesse
    * Dispatcher. */

    private eventHandlers: {[eventName: string]: EventHandlerInterface[] } = {}

    notify(event: EventInterface): void {

    }

    /* Primeiramente, vemos se o evento já existe. */
    register(eventName: string, eventHandler: EventHandlerInterface): void {
        if(!this.eventHandlers[eventName]) {
            this.eventHandlers[eventName] = [];
        }

        //Todas as vezes que criarmos um evento, podemos adicionar quantos handlers forem
        //necessários para esse evento.

        this.eventHandlers[eventName].push(eventHandler);
    }

    unregister(eventName: string, eventHandler: EventHandlerInterface): void {
    }

    unregisterAll(): void {
    }

    getEventHandlers(): {[eventName: string]: EventHandlerInterface[]} {
        return this.eventHandlers;
    }
}