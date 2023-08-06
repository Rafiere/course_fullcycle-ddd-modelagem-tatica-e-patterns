import SendEmailWhenProductIsCreatedHandler from "../product/handler/send-email-when-product-is-created.handler";
import EventDispatcher from "./event-dispatcher";

describe("Domain events tests", () => {

    it("should register an event handler", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        /* Estamos verificando se o "SendEmailWhenProductIsCreatedHandler" possui o
        * evento "ProductCreatedEvent" registrado. */
        expect(eventDispatcher.getEventHandlers()["ProductCreatedEvent"]).toBeDefined();

        expect(eventDispatcher.getEventHandlers()["ProductCreatedEvent"].length).toBe(1);

        expect(eventDispatcher.getEventHandlers()["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
    })

    it("should unregister an event handler", () => {

        /* Estamos registrando o evento e o handler. */
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        /* Estamos verificando se o evento está registrado. */
        expect(eventDispatcher.getEventHandlers()["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

        /* Estamos removendo o registro do evento. */
        eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

        /* Estamos verificando se, após removermos o handler, ele será, de fato, removido, e o evento
        * continuará lá. */
        expect(eventDispatcher.getEventHandlers()["ProductCreatedEvent"]).toBeDefined();

        expect(eventDispatcher.getEventHandlers()["ProductCreatedEvent"].length).toBe(0);
    })

    it("should unregister all event handlers", () => {

            /* Estamos registrando o evento e o handler. */
            const eventDispatcher = new EventDispatcher();
            const eventHandler = new SendEmailWhenProductIsCreatedHandler();

            eventDispatcher.register("ProductCreatedEvent", eventHandler);

            /* Estamos verificando se o evento está registrado. */
            expect(eventDispatcher.getEventHandlers()["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

            /* Estamos removendo o registro do evento. */
            eventDispatcher.unregisterAll();

            /* Estamos verificando se, após removermos o handler, ele será, de fato, removido, e o evento
            * continuará lá. */
            expect(eventDispatcher.getEventHandlers()["ProductCreatedEvent"]).toBeUndefined();
    })
})
