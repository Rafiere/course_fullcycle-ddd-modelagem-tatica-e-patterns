import Order from "../entity/order";
import {OrderItem} from "../entity/order-item";

/* Abaixo, temos a receita de criação de uma "Order". */
export interface OrderFactoryProps {
    id: string
    customerId: string;
    items: {
        id: string;
        name: string;
        productId: string;
        quantity: number;
        price: number;
    }[]
}

export default class OrderFactory {
    public static create(orderProps: OrderFactoryProps): Order {

        const items = orderProps.items.map(item => {
            return new OrderItem(
                item.id,
                item.name,
                item.productId,
                item.quantity,
                item.price);
        })

        return new Order(
            orderProps.id,
            orderProps.customerId,
            items);
    }
}
