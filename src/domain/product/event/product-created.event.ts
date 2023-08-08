import EventInterface from "../../@shared/event/event.interface";

/* Esse evento registrará quando um produto for criado. Ele terá os dados do
* evento. */
export default class ProductCreatedEvent implements EventInterface {
    dateTimeOcurred: Date;
    eventData: any;

    constructor(eventData: any) {
        this.dateTimeOcurred = new Date();
        this.eventData = eventData;
    }
}
