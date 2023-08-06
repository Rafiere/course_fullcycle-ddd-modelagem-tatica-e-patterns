import {OrderItem} from "../entity/order-item";
import Order from "../entity/order";
import OrderService from "./order.service";
import Customer from "../entity/customer";

describe("Order service unit tests", () => {

    it("it should get total of all orders", () => {
        const item1: OrderItem = new OrderItem("i1", "Item 01", "P1", 100, 2);
        const item2: OrderItem = new OrderItem("i2", "Item 02", "P2", 200, 4);

        const order = new Order("1", "1", [item1, item2]);
        const order2 = new Order("1", "1", [item2]);

        const total = OrderService.total([order, order2]);

        expect(total).toBe(1800);
    })

    /* A quantidade de pontos será igual a metade do valor dos preços que foram comprados. */

    it("should place an order", () => {
        const customer = new Customer("1", "Customer 01");
        const item1: OrderItem = new OrderItem("i1", "Item 01", "P1", 10, 2);

        /* Estamos criando uma nova "Order". */
        const order = OrderService.placeOrder(customer, [item1]);

        /* A quantidade de pontos vai ser a metade do valor que foi gasto na "Order". */
        expect(customer._rewardPoints).toBe(10);
        expect(order._total).toBe(20);
    })

    it("should add reward points", () => {
        const customer = new Customer("1", "Customer 01");
        expect(customer._rewardPoints).toBe(0)

        customer.addRewardPoints(10);
        expect(customer._rewardPoints).toBe(10)

        customer.addRewardPoints(20);
        expect(customer._rewardPoints).toBe(30)
    })
})
