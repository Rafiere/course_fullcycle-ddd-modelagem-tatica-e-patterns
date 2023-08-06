/* Esse será um dos blocos de processamento executados quando um evento do
* tipo "ProductCreated" for executado. */

import EventHandlerInterface from "../../shared/event-handler.interface";
import ProductCreatedEvent from "../product-created.event";

export default class SendEmailWhenProductIsCreatedHandler implements EventHandlerInterface<ProductCreatedEvent> {

    /* Abaixo, temos a ação que será executada quando esse evento for executado. */
    handle(event: ProductCreatedEvent): void {

        console.log("Sending email to...")
    }
}

