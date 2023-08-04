import Order from "./order";
import {OrderItem} from "./order-item";

describe("Order unit tests", () => {

    it("should throw error when id is empty", () => {
        expect(() => {
            const order = new Order("", "1", []);
        }).toThrowError("Order ID is required");
    })

    it("should throw error when customer ID is empty", () => {
        expect(() => {
            const order = new Order("123", "", []);
        }).toThrowError("Customer ID is required");
    })

    it("should throw error when order items is empty", () => {
        expect(() => {
            const order = new Order("123", "1", []);
        }).toThrowError("Order items are required");
    })

    it("should calculate total", () => {
            const item = new OrderItem("i1", "Item 1", "a", 200, 2);
            const item2 = new OrderItem("i2", "Item 2", "b", 400, 2);

            const order = new Order("123", "1", [item, item2]);

            expect(order.total).toBe(1200);
    })

    it("should check if the item quantity is greater than zero", () => {

        expect(() => {
            const item = new OrderItem("i1", "Item 1", "a", 200,  -2);

        }).toThrowError("Quantity must be greater than zero");
    })

    it("should check if the item price is greater than zero", () => {

        expect(() => {
            const item = new OrderItem("i1", "Item 1", "a", -200,  1);

        }).toThrowError("Price must be greater than zero");
    })
})
