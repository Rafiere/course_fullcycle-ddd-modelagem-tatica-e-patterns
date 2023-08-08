/* Estamos trabalhando com generics para conseguir explicitar o tipo
* da interface. */

/* Essa interface definirá todos os métodos que uma interface deverá
* ter. Ela seria algo como uma "interface-mãe" de todas as interfaces. */

/* O "T" representará os agregados. */
export default interface RepositoryInterface<T> {

    /* Estamos criando um objeto e já temos ele em nossas mãos, por
    * isso, salvo raras ocasiões, não deveremos retornar esse
    * objeto. Esse é um dos tópicos que é discutido nos livros de
    * DDD. */
    create(entity: T): Promise<void>

    update(entity: T): Promise<void>

    find(id: string): Promise<T>

    /* O Eric Evans recomenda, no "findAll()", retornarmos um objeto com
    * metadados, que tenha, por exemplo, dados de paginação, contagem de
    * outros objetos e etc. */
    findAll(): Promise<T[]>
}
