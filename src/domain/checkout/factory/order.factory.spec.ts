import { v4 as uuidv4 } from "uuid";
import OrderFactory, {OrderFactoryProps} from "./order.factory";

describe("Order factory unit test", () => {

    it("should create an order", () => {

        /* O cliente não está preocupado com a criação do "Order". Ele não
        * se preocupa com validações, se teremos que criar um novo item e
        * etc. Ele apenas se preocupa em passar os dados necessários pela
        * factory e realizar a criação. */

        const orderProps: OrderFactoryProps = {
            id: uuidv4(),
            customerId: uuidv4(),
            items: [
                {
                    id: uuidv4(),
                    name: "Product 01",
                    productId: uuidv4(),
                    quantity: 1,
                    price: 100
                }
            ]
        }

        const order = OrderFactory.create(orderProps);

        expect(order.id).toEqual(orderProps.id);
        expect(order.customerId).toEqual(orderProps.customerId);
        expect(order.items.length).toBe(1);
    })
})
