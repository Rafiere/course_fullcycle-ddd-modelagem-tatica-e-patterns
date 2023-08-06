import OrderRepositoryInterface from "../../domain/repository/order-repository.interface";
import Order from "../../domain/entity/order";
import OrderModel from "../db/sequelize/model/order.model";
import OrderItemModel from "../db/sequelize/model/order-item.model";

export default class OrderRepository implements OrderRepositoryInterface {
    async create(entity: Order): Promise<void> {

        /* Por causa do "include", quando inserirmos um
        * objeto do tipo "Order" no banco de dados, o banco de
        * dados deverá inserir, também, os objetos do tipo
        * "OrderItem" que estão sendo criados. */

        await OrderModel.create({
                id: entity._id,
                customer_id: entity._customerId,
                total: entity.calculateTotalValue(),
                items: entity._items.map(item => ({
                    id: item._id,
                    product_id: item._productId,
                    name: item._name,
                    price: item._price,
                    quantity: item._quantity,
                })),
            },
            {
                include: [{model: OrderItemModel}]
            })
    }

    async find(id: string): Promise<Order> {
        return Promise.resolve(undefined);
    }

    async findAll(): Promise<Order[]> {
        return Promise.resolve([]);
    }

    async update(entity: Order): Promise<void> {
        return Promise.resolve(undefined);
    }
}
