/* Essa interface definirá todos os métodos que um "Product" deverá
* ter. */

export default interface ProductInterface {

    get _id(): string;
    get _name(): string;
    get _price(): number;
}
