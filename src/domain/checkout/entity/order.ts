import {OrderItem} from "./order-item";

export default class Order {

    id: string;

    /* A entidade vai ter apenas a referência do customer, pois
    * eles estão em agregados diferentes. */
    customerId: string;

    /* Como estamos do mesmo agregado, teremos um array de
    * "OrderItem" dentro dele. */
    items: OrderItem[] = [];

    private total: number;

    get _total(): number {
        return this.total;
    }


    constructor(id: string, customerId: string, items: OrderItem[]) {
        this.id = id;
        this.customerId = customerId;
        this.items = items;
        this.total = this.calculateTotalValue();
        this.validate();
    }

    validate(){
        if(this.id.length === 0){
            throw new Error("Order ID is required");
        }
        if(this.customerId.length === 0){
            throw new Error("Customer ID is required");
        }
        if(this.items.length === 0){
            throw new Error("Order items are required");
        }
    }

    calculateTotalValue(): number {
        return this.items.reduce((total, item) => total + (item._price * item._quantity), 0);
    }
}
