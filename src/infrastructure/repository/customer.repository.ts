import CustomerRepositoryInterface from "../../domain/repository/customer-repository.interface";
import Customer from "../../domain/entity/customer";
import CustomerModel from "../db/sequelize/model/customer.model";
import Address from "../../domain/entity/address";

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
        const customerModel = await CustomerModel.findOne({where: {id: id}});

        const address = new Address(customerModel.street, customerModel.number, customerModel.city, customerModel.zipCode);
        const customer = new Customer(customerModel.id, customerModel.name);

        customer.changeAddress(address);

        return customer;
    }

    async findAll(): Promise<Customer[]> {
        const customerModels = await CustomerModel.findAll();

        return customerModels.map(customerModel => {
            return new Customer(customerModel.id, customerModel.name);
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
