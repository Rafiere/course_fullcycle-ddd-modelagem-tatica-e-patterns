import CustomerRepositoryInterface from "../../../../domain/customer/repository/customer-repository.interface";
import Customer from "../../../../domain/customer/entity/customer";
import CustomerModel from "./customer.model";
import Address from "../../../../domain/customer/entity/value-object/address";

export default class CustomerRepository implements CustomerRepositoryInterface {
    async create(entity: Customer): Promise<void> {

        await CustomerModel.create({
            id: entity._id,
            name: entity._name,
            number: entity._address?.number ?? 0,
            street: entity._address?.street ?? '',
            city: entity._address?.city ?? '',
            zipCode: entity._address?.zipCode ?? '',
            active: entity._active,
            rewardPoints: entity._rewardPoints
        })
    }

    async find(id: string): Promise<Customer> {

        /* Estamos tratando o caso de borda em que um cliente não é encontrado. */

        let customerModel;

        try {
            /* Estamos rejeitando a promise caso o cliente não seja encontrado. */
            customerModel = await CustomerModel.findOne({where: {id: id}, rejectOnEmpty: true});
        } catch (error) {
            throw new Error("Customer not found")
        }

        /* Estamos criando o objeto igualmente ao objeto que foi salvo pela primeira vez, assim, estamos mantendo o
        * estado da entidade. */

        const address = new Address(customerModel.street, customerModel.number, customerModel.city, customerModel.zipCode);
        const customer = new Customer(customerModel.id, customerModel.name);
        customer.addRewardPoints(customerModel.rewardPoints);
        if(!customerModel.active){
            customer.activate();
        }

        customer.changeAddress(address);

        return customer;
    }

    /* O maior cuidado do repositório não é fazer a busca, mas remontar o objeto da forma mais
    * cuidadosa possível para trabalharmos. */
    async findAll(): Promise<Customer[]> {
        const customerModels = await CustomerModel.findAll();

        return customerModels.map(customerModel => {
            const address = new Address(customerModel.street, customerModel.number, customerModel.city, customerModel.zipCode)

            const createdCustomer = new Customer(customerModel.id, customerModel.name);

            createdCustomer.changeAddress(address);

            createdCustomer.addRewardPoints(customerModel.rewardPoints);

            if(customerModel.active){
                createdCustomer.activate();
            }

            return createdCustomer;
        })
    }

    async update(entity: Customer): Promise<void> {
        await CustomerModel.update({
            name: entity._name,
            number: entity._address.number,
            street: entity._address.street,
            city: entity._address.city,
            zipCode: entity._address.zipCode,
            active: entity._active,
            rewardPoints: entity._rewardPoints
        }, {
            where: {id: entity._id}
        })
    }
}
