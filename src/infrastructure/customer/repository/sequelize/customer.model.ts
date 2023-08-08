import {Column, Model, PrimaryKey, Table} from "sequelize-typescript";

/* Quando estamos falando de domínio, o "Address" é um objeto de valor, mas
* a tabela do banco de dados não se importa com isso. Dessa forma, nesse
* exemplo, escolhemos por colocar tudo na mesma tabela. */

/* Não podemos modelar o domínio pensando no banco de dados. Isso deve
* ser feito ao contrário, ou seja, o banco de dados deve ser modelado de
* acordo com o domínio. */
@Table({
  tableName: "customers",
    timestamps: false
})
export default class CustomerModel extends Model {

    @PrimaryKey
    @Column
    declare id: string;

    @Column({allowNull: false})
    declare name: string;

    @Column({allowNull: false})
    declare street: string;

    @Column({allowNull: false})
    declare number: number;

    @Column({allowNull: false})
    declare zipCode: string;

    @Column({allowNull: false})
    declare city: string;

    @Column({allowNull: false})
    declare active: boolean;

    @Column({allowNull: false})
    declare rewardPoints: number;
}
