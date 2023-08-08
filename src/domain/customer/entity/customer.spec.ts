/* É recomendado criarmos os testes perto do arquivo que está sendo
* testado. */

import Customer from "./customer";
import Address from "./value-object/address";

describe("Customer unit tests", () => {
    it("should throw error when id is empty", () => {

        expect(() => {
            new Customer("", "John");
        }).toThrowError("ID is required");
    });

    it("should throw error when id is empty", () => {

        expect(() => {
            new Customer("123", "");
        }).toThrowError("Name is required");
    })

    it("should change name", () => {

        //Arrange
        const customer = new Customer("123", "John");

        //Act
        customer.changeName("Jane");

        //Assert
        expect(customer._name).toBe("Jane");
    })

    it("should activate customer", () => {

        //Arrange
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 100, "City 1", "12345678");
        customer.changeAddress(address);

        //Act
        customer.activate();

        //Assert
        expect(customer._active).toBe(true);
    })

    it("should deactivate customer", () => {

        //Arrange
        const customer = new Customer("1", "Customer 1");

        //Act
        customer.deactivate();

        //Assert
        expect(customer._active).toBe(false);
    })

    it("should throw error when address is undefined when you activate a customer", () => {
        expect(() => {
            const customer = new Customer("1", "Customer 1");
            customer.activate();
        }).toThrowError("Address is required to activate the customer.");
    })
})
