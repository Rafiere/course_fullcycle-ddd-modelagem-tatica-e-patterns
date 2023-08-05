/* Abaixo, temos um Objeto de Valor. */

/* Eles não devem ter "getters" e "setters". Se um atributo
* mudar, ele deve ser substituído por completo. */

/* Esse objeto não é único, pois ele não é uma entidade. */
export default class Address {

    private readonly _street: string;
    private readonly _number: number;
    private readonly _zipCode: string;
    private readonly _city: string;

    constructor(street: string, number: number, city: string, zipCode: string) {
        this._street = street;
        this._number = number;
        this._city = city;
        this._zipCode = zipCode;

        this.validate();
    }

    validate(){
        if(this._street.length === 0){
            throw new Error("Street is required");
        }
        if(this._number === 0){
            throw new Error("Number is required");
        }
        if(this._city.length === 0){
            throw new Error("City is required");
        }
        if(this._zipCode.length === 0){
            throw new Error("Zip code is required");
        }
    }

    get street(): string {
        return this._street;
    }

    get number(): number {
        return this._number;
    }

    get zipCode(): string {
        return this._zipCode;
    }

    get city(): string {
        return this._city;
    }

    /* Podemos modificar a forma de exibição desse objeto. */
    toString(){
        return `${this._street}, ${this._number}, ${this._city}, ${this._zipCode}`;
    }
}
