import {Sequelize} from "sequelize-typescript";
import ProductModel from "./product.model";
import Product from "../../../../domain/product/entity/product";
import ProductRepository from "./product.repository";

describe("Product repository tests", () => {

    let sequelize: Sequelize

    /* Antes de cada teste, esse método será executado. */

    /* Vamos utilizar o SQLite3 para criarmos um banco em memória. */
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: {force: true}
        })

        /* Estamos utilizando esse método para informarmos para o Sequelize que
        * esse módulo existe. */
        sequelize.addModels([ProductModel])

        /* O "sync" garantirá que as tabelas serão criadas corretamente no
        * banco de dados. */
        await sequelize.sync()
    })

    /* Após cada teste ser executado, fecharemos a conexão com o banco
    * de dados. */
    afterEach(async () => {
        await sequelize.close();
    })

    it("should create a product", async () => {
        const productRepository = new ProductRepository();

        const product = new Product("1", "Product 1", 10);

        await productRepository.create(product);

        const productModel = await ProductModel.findOne({where: {id: "1"}});

        /* Queremos que o resultado inserido no banco seja igual ao resultado que estamos esperando. */
        expect(productModel.toJSON()).toStrictEqual({
            id: "1",
            name: "Product 1",
            price: 10
        })
    })

    it("should update a product", async () => {
        const productRepository = new ProductRepository();

        const product = new Product("1", "Product 1", 10);

        await productRepository.create(product);

        const productModel = await ProductModel.findOne({where: {id: "1"}});

        expect(productModel.toJSON()).toStrictEqual({
            id: "1",
            name: "Product 1",
            price: 10
        })

        product.changeName("Product 2");
        product.changePrice(20);

        await productRepository.update(product);

        const productModelUpdated = await ProductModel.findOne({where: {id: "1"}});

        expect(productModelUpdated.toJSON()).toStrictEqual({
            id: "1",
            name: "Product 2",
            price: 20
        })
    })

    it("should find a product", async () => {
        const productRepository = new ProductRepository();

        const product = new Product("1", "Product 1", 10);

        await productRepository.create(product);

        const productModel = await ProductModel.findOne({where: {id: "1"}});

        const foundProduct = await productRepository.find("1");

        expect(productModel.toJSON()).toStrictEqual({
            id: foundProduct._id,
            name: foundProduct._name,
            price: foundProduct._price
        })
    })

    it("should find all products", async () => {
        const productRepository = new ProductRepository();

        const product = new Product("1", "Product 1", 10);
        productRepository.create(product);

        const product2 = new Product("2", "Product 2", 20);
        productRepository.create(product2);

        /* Estamos testando esse método. */
        const foundProducts = await productRepository.findAll();

        const products = [product, product2];

        /* Estamos esperando que os produtos criados sejam iguais aos produtos encontrados
        * pelo repository. */
        expect(products).toEqual(foundProducts);
    })
})
