import {Sequelize} from "sequelize-typescript";
import CustomerRepository from "./customer.repository";
import Address from "../../domain/entity/address";
import Customer from "../../domain/entity/customer";
import CustomerModel from "../db/sequelize/model/customer.model";

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
})
