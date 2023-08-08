import {Sequelize} from "sequelize-typescript";
import CustomerRepository from "./customer.repository";
import Address from "../../../../domain/customer/entity/value-object/address";
import Customer from "../../../../domain/customer/entity/customer";
import CustomerModel from "./customer.model";

describe("Customer repository unit tests", () => {

    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: {force: true}
        })

        /* Estamos utilizando esse método para informarmos para o Sequelize que
        * esse módulo existe. */
        sequelize.addModels([CustomerModel])

        /* O "sync" garantirá que as tabelas serão criadas corretamente no
        * banco de dados. */
        await sequelize.sync()
    })

    /* Após cada teste ser executado, fecharemos a conexão com o banco
    * de dados. */
    afterEach(async () => {
        await sequelize.close();
    })

    it("should create a new customer", async () => {

        const customerRepository = new CustomerRepository();

        const address = new Address("Street 1", 10, "City 1", "10000-000")

        const customer = new Customer("1", "Customer 1");

        customer.changeAddress(address);

        await customerRepository.create(customer);

        const customerModel = await CustomerModel.findOne({where: {id: "1"}});

        expect(customerModel.toJSON()).toStrictEqual({
            id: customer._id,
            name: customer._name,
            street: address.street,
            number: address.number,
            city: address.city,
            zipCode: address.zipCode,
            active: customer._active,
            rewardPoints: customer._rewardPoints
        })
    })

    it("should update a customer", async () => {
        const customerRepository = new CustomerRepository();

        const address = new Address("Street 1", 10, "City 1", "10000-000")
        const customer = new Customer("1", "Customer 1");

        customer.changeAddress(address);

        await customerRepository.create(customer);

        customer.changeName("Customer 2");

        await customerRepository.update(customer);

        const customerModel = await CustomerModel.findOne({where: {id: "1"}});

        expect(customerModel.toJSON()).toStrictEqual({
            id: customer._id,
            name: customer._name,
            street: address.street,
            number: address.number,
            city: address.city,
            zipCode: address.zipCode,
            active: customer._active,
            rewardPoints: customer._rewardPoints
        })
    })

    it("should find a customer by id", async () => {

        const customerRepository = new CustomerRepository();

        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 10, "City 1", "10000-000")
        customer.changeAddress(address);

        await customerRepository.create(customer);

        const customerModel = await customerRepository.find("1");

        expect(customerModel).toStrictEqual(customer);
    })

    it("should throw an error when customer is not found", () => {
        const customerRepository = new CustomerRepository();

        expect(async () => {
            await customerRepository.find("12345");
        }).rejects.toThrow("Customer not found")
    })

    it("should find all customers", async () => {
      const customerRepository = new CustomerRepository();

        const customer1 = new Customer("1", "Customer 1");
        const address1 = new Address("Street 1", 10, "City 1", "10000-000")
        customer1.changeAddress(address1);
        await customerRepository.create(customer1);

        const customer2 = new Customer("2", "Customer 2");
        const address2 = new Address("Street 2", 20, "City 2", "20000-000")
        customer2.changeAddress(address2);
        await customerRepository.create(customer2);

        const customerModel = await customerRepository.findAll();

        expect(customerModel).toHaveLength(2)

        expect(customerModel).toStrictEqual([customer1, customer2]);
    })
})
