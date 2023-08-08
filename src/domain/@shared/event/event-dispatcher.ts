import EventDispatcherInterface from "./event-dispatcher.interface";
import EventInterface from "./event.interface";
import EventHandlerInterface from "./event-handler.interface";

export default class EventDispatcher implements EventDispatcherInterface {

    /* Abaixo, temos uma lista de Event Handlers que estão registrados nesse
    * Dispatcher. */

    private eventHandlers: {[eventName: string]: EventHandlerInterface[] } = {}

    notify(event: EventInterface): void {
        /* Estamos verificando se o evento existe. Para cada evento no
        * "forEach()", estamos executando a função "handle". */

        const eventName = event.constructor.name;

        if(!this.eventHandlers[eventName]) {
            return;
        }

        /* Para cada handler desse evento, estamos executando o método
        * "handle()" de todos os handlers desse evento. */
        this.eventHandlers[eventName].forEach((handler) => handler.handle(event));
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

        if(!this.eventHandlers[eventName]) {
            return;
        }

        /* Se o evento existir, removeremos o handler desse evento. */
        const index = this.eventHandlers[eventName]
            .findIndex((handler) => handler === eventHandler);

        if(index !== -1) {
            this.eventHandlers[eventName].splice(index, 1);
        }
    }

    unregisterAll(): void {

        /* Removendo o registro de todos os handlers. */
        this.eventHandlers = {};
    }

    getEventHandlers(): {[eventName: string]: EventHandlerInterface[]} {
        return this.eventHandlers;
    }
}
