import Customer from "./domain/customer/entity/customer";
import Address from "./domain/customer/entity/value-object/address";
import {OrderItem} from "./domain/checkout/entity/order-item";
import Order from "./domain/checkout/entity/order";

/* O "Customer" e o "Address" fazem parte de um agregado. */
let customer = new Customer("1", "John");
const address = new Address("Street 1", 100, "City 1", "12345678");
customer.changeAddress(address);
customer.activate();

/* O "OrderItem" e o "Ordem" fazem parte de outro agregado. */
const item1 = new OrderItem("1", "Item 01", "a", 2, 200);
const item2 = new OrderItem("1", "Item 02", "b", 3, 45);

const order = new Order("1", customer._id, [item1, item2]);
