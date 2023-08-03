import Product from "../entity/product";

export default class ProductService {

    /* Esse método não precisa guardar estado, pois ele simplesmente executa uma
    * ação nos produtos. */
    static increasePrice(products: Product[], percentage: number){
        return products.map(product => {
            const newPrice = product._price * (1 + percentage/100)
            product.changePrice(newPrice)
        })
    }
}
