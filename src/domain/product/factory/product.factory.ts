import ProductInterface from "../entity/product.interface";
import Product from "../entity/product";
import { v4 as uuid } from "uuid";
export default class ProductFactory {

    /* Estamos atribuindo a responsabilidade de criação do objeto para a factory dele. O cliente não
    * possui nenhuma responsabilidade nessa implementação. */
    public static create(name: string, type: string, price: number): ProductInterface {
        /* Se, supostamente, o produto fosse do tipo "A", uma criação seria feita. Se fosse
        * de um tipo "B", outra criação seria feita. */

        switch (type) {
            case "A":
                return new Product(uuid(), name, price);
            case "B":
                return new Product(uuid(), name, price);
            default:
                throw new Error("Invalid product type");
        }
    }
}
