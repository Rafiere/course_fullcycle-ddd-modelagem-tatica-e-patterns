import SendEmailWhenProductIsCreatedHandler from "../../product/event/handler/send-email-when-product-is-created.handler";
import EventDispatcher from "./event-dispatcher";
import ProductCreatedEvent from "../../product/event/product-created.event";

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

    it("should notify all event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        /* Estamos criando um "spy" para espionar o "eventHandler" e verificar se
        * ele está executando o método "handle". */
        const spyEventHandler = jest.spyOn(eventHandler, "handle");

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers()["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

        const productCreatedEvent = new ProductCreatedEvent({
            name: "Product 1",
            description: "Product 1 description",
            price: 100
        });

        /* Quando colocamos um "notify()", o "eventHandler" deverá executar o método
        * "handle()". */
        eventDispatcher.notify(productCreatedEvent)

        /* Estamos garantindo que o handle foi chamado. */
        expect(spyEventHandler).toHaveBeenCalledTimes(1);
    })
})
