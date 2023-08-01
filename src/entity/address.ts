/* Abaixo, temos um Objeto de Valor. */

/* Eles não devem ter "getters" e "setters". Se um atributo
* mudar, ele deve ser substituído por completo. */

/* Esse objeto não é único, pois ele não é uma entidade. */
export default class Address {

    private _street: string;
    private _number: number;
    private _zipCode: string;
    private _city: string;

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

    /* Podemos modificar a forma de exibição desse objeto. */
    toString(){
        return `${this._street}, ${this._number}, ${this._city}, ${this._zipCode}`;
    }
}
