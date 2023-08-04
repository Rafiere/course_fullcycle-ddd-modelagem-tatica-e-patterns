export class OrderItem {

    private id: string;

    /* Esse campo conecta um item com um produto. É só um ID pois eles
    * estão em agregados diferentes. */
    private productId: string;
    private name: string;
    private price: number;
    private quantity: number;

    constructor(id: string, productId: string, name: string, price: number, quantity: number) {
        this.id = id;
        this.productId = productId;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.validate();
    }

    validate(){
        if(this.id.length === 0){
            throw new Error("Order item ID is required");
        }
        if(this.productId.length === 0){
            throw new Error("Product ID is required");
        }
        if(this.name.length === 0){
            throw new Error("Product name is required");
        }
        if(this.price < 0){
            throw new Error("Price must be greater than zero");
        }
        if(this.quantity <= 0){
            throw new Error("Quantity must be greater than zero");
        }
    }

    get _price(){
        return this.price
    }

    get _quantity(){
        return this.quantity
    }
}
