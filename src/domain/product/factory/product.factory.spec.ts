import ProductFactory from "./product.factory";

describe("Product factory unit test", () => {

    it("should create a product type A", () => {

        const product = ProductFactory.create("Product A", "A", 100)

        expect(product._id).toBeDefined();
        expect(product._name).toBe("Product A");
        expect(product._price).toBe(100);
        expect(product.constructor.name).toBe("Product")
    })

    it("should create a product type B", () => {

        const product = ProductFactory.create("Product B", "B", 100)

        expect(product._id).toBeDefined();
        expect(product._name).toBe("Product B");
        expect(product._price).toBe(100);
        expect(product.constructor.name).toBe("Product")
    })

    it("should throw error when product type is invalid", () => {

        expect(() => {
            ProductFactory.create("Product C", "C", 100)
        }).toThrowError("Invalid product type")
    })
})
