import CustomerFactory from "./customer.factory";
import Address from "../entity/value-object/address";

describe("Customer factory unit test", () => {

    it("should create a customer without an address", () => {

        const customer = CustomerFactory.create("John");

        expect(customer._id).toBeDefined();
        expect(customer._name).toBe("John");
        expect(customer._address).toBeUndefined();
    })

    it("should create a customer with an address", () => {

        const address = new Address("Street 1", 100, "City", "12345-000");

        const customer = CustomerFactory.createWithAddress("John", address);

        expect(customer._id).toBeDefined();
        expect(customer._name).toBe("John");
        expect(customer._address).toEqual(address);
    })
})
