import ProductRepositoryInterface from "../../../../domain/product/repository/product-repository.interface";
import Product from "../../../../domain/product/entity/product";
import ProductModel from "./product.model";

export default class ProductRepository implements ProductRepositoryInterface {

    /* Essa implementação está correta, mas está simples. Se a criação de
    * um produto falhar, por exemplo, deveríamos ter um try-catch para
    * tratar esse caso. */
    async create(entity: Product): Promise<void> {
        await ProductModel.create({
            id: entity._id,
            name: entity._name,
            price: entity._price
        })
    }

    async find(id: string): Promise<Product> {
        const productModel = await ProductModel.findOne({where: {id: id}});

        return new Product(productModel.id, productModel.name, productModel.price);
    }

    async findAll(): Promise<Product[]> {
        const productModels = await ProductModel.findAll();

        return productModels.map(productModel => {
            return new Product(productModel.id, productModel.name, productModel.price);
        })
    }

    async update(entity: Product): Promise<void> {
        await ProductModel.update({
                name: entity._name,
                price: entity._price,
            },
            {
                where: {id: entity._id}
            })
    }
}
