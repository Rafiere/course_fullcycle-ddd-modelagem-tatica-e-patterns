import {Column, Model, PrimaryKey, Table} from "sequelize-typescript";

/* Aqui, temos a implementação do módulo que representará a
* tabela do banco de dados que será gerado pelo Sequelize. */

@Table({
    tableName: "products",
    /* Estamos desativando o "createdAt" e etc... */
    timestamps: false
})
export default class ProductModel extends Model {

    @PrimaryKey
    @Column
    declare id: string;

    /* Estamos definindo que essa coluna não pode ficar em branco. */
    @Column({allowNull: false})
    declare name: string;

    @Column({allowNull: false})
    declare price: number;
}
