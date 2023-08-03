import Order from "../entity/order";
import Customer from "../entity/customer";
import {OrderItem} from "../entity/order-item";
import {v4 as uuid} from "uuid"

/* Esse é um domain service. */
export default class OrderService {

    static total(orders: Order[]): number {
        return orders.reduce((total, order) => total + order.total, 0)
    }

    /* Estamos utilizando os agregados "Customer" e "Order" para executar essa
    * ação, logo, colocamos esse método em um "domain service". */
    static placeOrder(customer: Customer, orderItems: OrderItem[]) {

        if (orderItems.length === 0) {
            throw new Error("Order must have at least one item")
        }

        const order = new Order(uuid(), customer.id, orderItems);

        customer.addRewardPoints(order.total / 2);
        return order;
    }
}
