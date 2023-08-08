import Product from "../entity/product";
import ProductService from "./product.service";
import Customer from "../../customer/entity/customer";

describe("Product service unit tests", () => {

    it("should change the prices of all products", () => {

        const product1 = new Product("Product 01", "TV", 100);
        const product2 = new Product("Product 02", "Sofá", 20);

        const products = [product1, product2];

        ProductService.increasePrice(products, 100);

        expect(product1._price).toBe(200)
        expect(product2._price).toBe(40)
    })
})
