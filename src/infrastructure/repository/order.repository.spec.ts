import {Sequelize} from "sequelize-typescript";
import CustomerModel from "../db/sequelize/model/customer.model";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import ProductModel from "../db/sequelize/model/product.model";
import CustomerRepository from "./customer.repository";
import Customer from "../../domain/entity/customer";
import Address from "../../domain/entity/address";
import ProductRepository from "./product.repository";
import Product from "../../domain/entity/product";
import {OrderItem} from "../../domain/entity/order-item";
import Order from "../../domain/entity/order";
import OrderRepository from "./order.repository";
import OrderModel from "../db/sequelize/model/order.model";

describe("Order repository tests", () => {

    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: {force: true}
        })

        sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel])

        await sequelize.sync()
    })

    afterEach(async () => {
        await sequelize.close();
    })

    it("should create a new order", async () => {

        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 10, "City 1", "10000-000")

        customer.changeAddress(address);

        await customerRepository.create(customer);
        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 10);

        await productRepository.create(product);

        const orderItem = new OrderItem(
            "1",
            product._id,
            product._name,
            product._price,
            2
        );

        const order = new Order("123", "123", [orderItem]);
        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({where: {id: order._id}, include: ["items"]});

        expect(orderModel.toJSON()).toStrictEqual({
            id: "123",
            customer_id: "123",
            total: order.calculateTotalValue(),
            items: [
                {
                    id: orderItem._id,
                    name: orderItem._name,
                    price: orderItem._price,
                    quantity: orderItem._quantity,
                    order_id: "123",
                    product_id: "123"
                }
            ]
        })
    })
})
