import Customer from "./domain/entity/customer";
import Address from "./domain/entity/address";
import {OrderItem} from "./domain/entity/order-item";
import Order from "./domain/entity/order";

/* O "Customer" e o "Address" fazem parte de um agregado. */
let customer = new Customer("1", "John");
const address = new Address("Street 1", 100, "City 1", "12345678");
customer.address = address;
customer.activate();

/* O "OrderItem" e o "Ordem" fazem parte de outro agregado. */
const item1 = new OrderItem("1", "Item 01", "a", 2, 200);
const item2 = new OrderItem("1", "Item 02", "b", 3, 45);

const order = new Order("1", customer.id, [item1, item2]);
