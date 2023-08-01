import {OrderItem} from "./order-item";

export default class Order {

    _id: string;

    /* A entidade vai ter apenas a referência do customer, pois
    * eles estão em agregados diferentes. */
    _customerId: string;

    /* Como estamos do mesmo agregado, teremos um array de
    * "OrderItem" dentro dele. */
    _items: OrderItem[] = [];


    constructor(id: string, customerId: string, items: OrderItem[]) {
        this._id = id;
        this._customerId = customerId;
        this._items = items;
    }

    calculateTotalValue(): number {
        return this._items.reduce((total, item) => total + item._price, 0);
    }
}
