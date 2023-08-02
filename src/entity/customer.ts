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

import Address from "./address";

export default class Customer {

    private _id: string;
    private _name: string;
    private _address!: Address;
    private _active: boolean = true;

    /* No momento da CONSTRUÇÃO do objeto, ele já deve estar se autovalidando. Isso
    * garantirá que, todas as vezes que vamos tentar criar um objeto errado ou não
    * atendermos às regras de negócio. */

    /* Se uma regra de negócio dizer que um nome que começa com "a" não pode ser
    * cadastrado no sistema, o método "validate()" deverá realizar essa validação. */

    /* Não devemos usar "setters" porque eles podem não validar as regras de negócio
    * corretamente, assim como o "validate" poderá validar. */
    constructor(id: string, name: string) {
        this._id = id;
        this._name = name;
        this.validate();
    }

    /* O método "validate()" não pode permitir que uma entidade inconsistente seja
    * criada. Nesse exemplo, se o "id" e o "name" são obrigatórios, a entidade precisará
    * fazer essa validação. */
    validate(){
        if(this._id.length === 0){
            throw new Error("ID is required");
        }
        if(this._name.length === 0){
            throw new Error("Name is required");
        }
    }

    /* Abaixo, os métodos "activate()" e "deactivate()" podem
    * expressar o negócio, ou seja, dentro do domínio rico, teremos
    * as regras de negócio. */

    /* Quando estamos falando em DDD, a validação significa fazer com que o
    * estado da entidade atual esteja sempre correto. */

    /* A entidade sempre terá que representar o estado correto e atual de um
    * determinado elemento. */
    activate(){

        /* Abaixo, estamos apenas ativando o usuário se ele tiver um endereço. Essa poderia ser
        * uma regra de negócios da aplicação. */
        if(this._address === undefined){
            throw new Error("Address is required to activate the customer.");
        }
        this._active = true;
    }

    deactivate(){
        this._active = false;
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    public isActive(): boolean {
        return this._active;
    }

    set id(value: string) {
        this._id = value;
    }


    /* Nesse caso, podemos ter um "setAddress" na entidade, e o tipo dele
    * deve ser `Address`. */
    set address(value: Address) {
        this._address = value;
    }

    /* Quando começamos pensar em "motivos para mudança", começamos a
    * pensar em regras de negócio. */

    /* A diferença de criarmos um "setName" e um método "changeName" é que
    * o "setName" não possui expressividade nenhuma. Ele está lá para "caso seja necessária a
    * mudança", e o método "changeName()", pelo contrário, possui uma semântica indicando que
    * o nome pode ser alterado caso ele seja inserido errado. */

    /* Abaixo, teremos a plena certeza de que, se algo acontecer, ele não poderá
    * inputar nada errado. */
    changeName(name: string){
        this._name = name;
        this.validate();
    }
}
