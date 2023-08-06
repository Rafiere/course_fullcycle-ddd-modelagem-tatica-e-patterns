import EventInterface from "../shared/event.interface";

/* Esse evento registrará quando um produto for criado. Ele terá os dados do
* evento. */
export default class ProductCreatedEvent implements EventInterface {
    dataTimeOcurred: Date;
    eventData: any;

    constructor(eventData: any) {
        this.dataTimeOcurred = new Date();
        this.eventData = eventData;
    }
}
