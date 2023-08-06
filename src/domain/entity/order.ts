import {OrderItem} from "./order-item";

export default class Order {

    _id: string;

    /* A entidade vai ter apenas a referência do customer, pois
    * eles estão em agregados diferentes. */
    _customerId: string;

    /* Como estamos do mesmo agregado, teremos um array de
    * "OrderItem" dentro dele. */
    _items: OrderItem[] = [];

    private total: number;

    get _total(): number {
        return this.total;
    }


    constructor(id: string, customerId: string, items: OrderItem[]) {
        this._id = id;
        this._customerId = customerId;
        this._items = items;
        this.total = this.calculateTotalValue();
        this.validate();
    }

    validate(){
        if(this._id.length === 0){
            throw new Error("Order ID is required");
        }
        if(this._customerId.length === 0){
            throw new Error("Customer ID is required");
        }
        if(this._items.length === 0){
            throw new Error("Order items are required");
        }
    }

    calculateTotalValue(): number {
        return this._items.reduce((total, item) => total + (item._price * item._quantity), 0);
    }
}
