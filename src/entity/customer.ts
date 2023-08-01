/* Uma entidade é algo que é único, por isso atribuímos um
* ID para ela. */

/* Quando temos uma entidade que possui um ID, os outros
* atributos, os getters e os setters, temos uma entidade
* anêmica. */

/* Uma entidade anêmica está apenas guardando dados e não
* possui nenhuma regra de negócio. */

/* Normalmente, quando criamos uma entidade, estamos criando
* algo que está orientado diretamente ao banco de dados, ou
* seja, ao ORM, pois sabemos que cada atributo será uma
* coluna da tabela. */

/* O problema disso é que estamos criando uma entidade orientada
* a um ORM. */

/* O DDD faz com que uma entidade não seja algo que possui getters, setters e
* fala com o banco de dados, e sim uma parte do sistema responsável por
* carregar as regras de negócio do sistema, ou seja, estaremos criando um
* domínio rico. */

/* Basicamente, se algo acontecer com um "Customer", isso deve ser
* alterado dentro dessa classe. */

/* Qualquer coisa que valide um objeto, que lance uma exception e que
* atenda, de forma expressiva, uma regra que a aplicação precisa, é considerada
* como uma regra de negócio. */

class Customer {

    private _id: string;
    private _name: string;
    private _address: string;

    constructor(id: string, name: string, address: string) {
        this._id = id;
        this._name = name;
        this._address = address;
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get address(): string {
        return this._address;
    }

    set id(value: string) {
        this._id = value;
    }

    set name(value: string) {
        this._name = value;
    }

    set address(value: string) {
        this._address = value;
    }
}
