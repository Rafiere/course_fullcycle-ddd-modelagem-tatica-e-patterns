import {BelongsTo, Column, ForeignKey, HasMany, Model, PrimaryKey, Table} from "sequelize-typescript";
import CustomerModel from "./customer.model";
import OrderItemModel from "./order-item.model";

@Table({
    tableName: "orders",
    timestamps: false
})
export default class OrderModel extends Model {

    @PrimaryKey
    @Column
    declare id: string;

    /* Estamos criando uma chave estrangeira que apontará para um "CustomerModel". */

    /* Estamos fazendo apenas o relacionamento de um ID. */
    @ForeignKey(() => CustomerModel)
    @Column({allowNull: false})
    declare customer_id: string;

    /* Aqui, estamos recuperando o cliente inteiro, caso seja necessário. */
    @BelongsTo(() => CustomerModel)
    declare customer: CustomerModel;

    /* Estamos definindo que uma ordem tem muitos itens e que um
    * item pertence a várias ordens. */
    @HasMany(() => OrderItemModel)
    declare items: OrderItemModel[];

    @Column({allowNull: false})
    declare total: number;
}
