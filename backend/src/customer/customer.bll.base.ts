import { CustomerNS } from "./customer.ns";

export class CustomerBllBase implements CustomerNS.BLL{
    constructor(private dal: CustomerNS.DAL){}

    async init(){}

    
    async GetCustomer(id: string) {
        const doc = await this.dal.GetCustomer(id);
        return doc;
    }
    
    async ListCustomer() {
        const docs = await this.dal.ListCustomer();
        return docs;
    }

    async CreateCustomer(params: CustomerNS.CreateCustomerParams) {
        const now = Date.now();
        let customer: CustomerNS.Customer = {
            id: CustomerNS.Generator.NewCustomerId(),
            name: params.name,
            phone: params.phone,
            ctime: now,
            mtime: now,
        }
        await this.dal.CreateCustomer(customer);
        return customer
    }

    async UpdateCustomer(id: string, params: CustomerNS.UpdateCustomerParams){
        const customer = await this.GetCustomer(id);
        const doc = {...customer, ...params};
        doc.mtime = Date.now();
        await this.dal.UpdateCustomer(doc);
        return doc;
    }

   async DeleteCustomer(id: string){
       const doc = await this.GetCustomer(id);
       doc.dtime = Date.now();
       await this.dal.UpdateCustomer(doc);
   }
}