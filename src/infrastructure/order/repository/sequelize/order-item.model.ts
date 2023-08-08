import {BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table} from "sequelize-typescript";
import ProductModel from "../../../product/repository/sequelize/product.model";
import OrderModel from "./order.model";

@Table({
    tableName: "order_items",
    timestamps: false
})
export default class OrderItemModel extends Model {

    @PrimaryKey
    @Column
    declare id: string;

    /* Essa coluna representa a chave estrangeira que aponta para o "product_id". */
    @ForeignKey(() => ProductModel)
    @Column({allowNull: false})
    declare productId: string;

    /* Essa coluna representa a classe inteira, que aponta para o "ProductModel". */
    @BelongsTo(() => ProductModel)
    declare product: ProductModel;

    @ForeignKey(() => OrderModel)
    @Column({allowNull: false})
    declare orderId: string;

    /* Estamos definindo que um item pertence a apenas uma ordem. */
    @BelongsTo(() => OrderModel)
    declare order: OrderModel;

    @Column({allowNull: false})
    declare quantity: number;

    @Column({allowNull: false})
    declare name: string;

    @Column({allowNull: false})
    declare price: number;


}
