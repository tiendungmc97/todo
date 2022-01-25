import rand from "../lib/rand";

export namespace CustomerNS{

    export interface Customer{
        id: string;
        name: string;
        phone: string;
        ctime: number;
        mtime: number;
        dtime?: number;
    }

    export interface CreateCustomerParams{
        name: string;
        phone: string;
    }

    export interface UpdateCustomerParams{
        name?: string;
        phone?: string;
    }

    export interface BLL{
        GetCustomer(id: string): Promise<Customer>;
        ListCustomer(): Promise<Customer[]>;
        CreateCustomer(params: CreateCustomerParams): Promise<Customer>;
        UpdateCustomer(id: string, params: UpdateCustomerParams): Promise<Customer>;
        DeleteCustomer(id: string): Promise<void>;
    }

    export interface DAL{
        GetCustomer(id: string): Promise<Customer>;
        ListCustomer(): Promise<Customer[]>;
        CreateCustomer(customer: Customer): Promise<void>;
        UpdateCustomer(customer: Customer): Promise<void>;
    }

    export const Errors = {
        CustomerNotFound: new Error("Todo not found"),
        ErrCustomerExisted: new Error("Todo existed"),
    }

    export const Generator = {
        NewCustomerId: () => rand.uppercase(8),
    }

    export enum TypeCustomer {
        Bronze = "bronze",
        Silver = "silver",
        Gold = "gold"
    }
}