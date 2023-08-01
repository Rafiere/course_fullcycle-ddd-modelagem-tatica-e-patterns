import Customer from "./entity/customer";
import Address from "./entity/address";
import {OrderItem} from "./entity/order-item";
import Order from "./entity/order";

/* O "Customer" e o "Address" fazem parte de um agregado. */
let customer = new Customer("1", "John");
const address = new Address("Street 1", 100, "City 1", "12345678");
customer._address = address;
customer.activate();

/* O "OrderItem" e o "Ordem" fazem parte de outro agregado. */
const item1 = new OrderItem("1", "Item 01", 100);
const item2 = new OrderItem("1", "Item 02", 15);

const order = new Order("1", customer._id, [item1, item2]);
