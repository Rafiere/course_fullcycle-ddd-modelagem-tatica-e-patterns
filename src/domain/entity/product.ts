export default class Product {

    private id: string;
    private name: string;
    private price: number;

    constructor(id: string, name: string, price: number) {
        this.id = id;
        this.name = name;
        this.price = price;

        this.validate();
    }

    validate(){
        if(this.id.length === 0){
            throw new Error("Product ID is required");
        }
        if(this.name.length === 0){
            throw new Error("Product name is required");
        }
        if(this.price < 0){
            throw new Error("Price must be greater than zero");
        }
    }

    changeName(name: string){
        this.name = name;
    }

    changePrice(price: number) {
        this.price = price;
    }

    get _id(): string {
        return this.id;
    }

    get _name(): string {
        return this.name;
    }

    get _price(): number {
        return this.price;
    }

}
