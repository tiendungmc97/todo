import { FromMongoData, MongoDB, ToMongoData, MongoModel} from "../lib/mongodb";
import { CustomerNS } from "./customer.ns";

export class CustomerDalMongo implements CustomerNS.DAL{
    constructor(private db: MongoDB) {}

    async init() {}

    private col_customer = this.db.collection<MongoModel<CustomerNS.Customer>>("customer");

    
    async GetCustomer(id: string) {
        const doc = await this.col_customer.findOne({_id: id});
        return FromMongoData.One<CustomerNS.Customer>(doc);
    }
    
    async ListCustomer() {
        const docs = await this.col_customer.find().toArray();
        return FromMongoData.Many<CustomerNS.Customer>(docs);
    }

    async CreateCustomer(customer: CustomerNS.Customer): Promise<void> {
        try {
            const doc = ToMongoData.One(customer);
            await this.col_customer.insertOne(doc);
        } catch (error) {
            if(error.code) throw CustomerNS.Errors.ErrCustomerExisted;
        }
    }

    async UpdateCustomer(customer: CustomerNS.Customer): Promise<void> {
        const doc = await ToMongoData.One(customer);
        await this.col_customer.updateOne({ _id: customer.id}, {$set: doc});
    }
}