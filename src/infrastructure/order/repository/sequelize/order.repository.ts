import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-repository.interface";
import Order from "../../../../domain/checkout/entity/order";
import OrderModel from "./order.model";
import OrderItemModel from "./order-item.model";
import {OrderItem} from "../../../../domain/checkout/entity/order-item";

export default class OrderRepository implements OrderRepositoryInterface {
    async create(entity: Order): Promise<void> {

        /* Por causa do "include", quando inserirmos um
        * objeto do tipo "Order" no banco de dados, o banco de
        * dados deverá inserir, também, os objetos do tipo
        * "OrderItem" que estão sendo criados. */

        await OrderModel.create({
                id: entity.id,
                customer_id: entity.customerId,
                total: entity.calculateTotalValue(),
                items: entity.items.map(item => ({
                    id: item._id,
                    productId: item._productId,
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

        const orderModel = await OrderModel.findOne({where: {id: id}, include: ["items"]})

        return new Order(orderModel.id, orderModel.customer_id, orderModel.items.map(item => {
            return new OrderItem(item.id, item.productId, item.name, item.price, item.quantity);
        }))
    }

    async findAll(): Promise<Order[]> {
        const orderModels = await OrderModel.findAll({include: ["items"]});

        return orderModels.map(orderModel => {
            return new Order(orderModel.id, orderModel.customer_id, orderModel.items.map(item => {
                return new OrderItem(item.id, item.productId, item.name, item.price, item.quantity);
            }))
        })
    }

    async update(entity: Order): Promise<void> {
        const orderModel = await OrderModel.findOne({where: {id: entity.id}});

        await orderModel.update({
            customer_id: entity.customerId,
            items: entity.items,
            total: entity.calculateTotalValue(),
        })
    }
}
