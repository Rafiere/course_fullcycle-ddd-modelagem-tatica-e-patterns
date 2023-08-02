import Product from "./product";

describe ("Product unit tests", () => {

    it("should throw error when id is empty", () => {

        expect(() => {
            const product = new Product("", "Product 1", 100)
        }).toThrowError("Product ID is required")
    })

    it("should throw error when name is empty", () => {
        expect(() => {
            const product = new Product("1", "", 100)
        }).toThrowError("Product name is required")
    })

    it("should throw error when price is less than zero", () => {
        expect(() => {
            const product = new Product("1", "Teste", -1)
        }).toThrowError("Price must be greater than zero")
    })

    it("should change name", () => {
        //Arrange
        const product = new Product("1", "Teste", 100)

        //Act
        product.changeName("Teste 2")

        //Assert
        expect(product._name).toBe("Teste 2")
    })

    it("should change price", () => {
        //Arrange
        const product = new Product("1", "Teste", 100)

        //Act
        product.changePrice(200)

        //Assert
        expect(product._price).toBe(200)
    })
})
