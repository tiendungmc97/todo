import  express  from "express";
import { HttpParamValidators } from "../lib/http";
import { CustomerNS } from "./customer.ns";

export function NewCustomerApi( customerBLL: CustomerNS.BLL){
    const router = express.Router();

    
    router.get("/get",async (req, res) => {
        const id = HttpParamValidators.MustBeString(req.query, "id", 2);
        const doc = await customerBLL.GetCustomer(id);
        res.json(doc);
    })
    
    router.get("/list",async (req, res) => {
        const docs = await customerBLL.ListCustomer();
        res.json(docs);
    })

    router.post("/create", async (req, res) => {
        const params: CustomerNS.CreateCustomerParams = {
            name: HttpParamValidators.MustBeString(req.body, "name", 2),
            phone: HttpParamValidators.MustBeString(req.body, "phone", 2),
          };
        const doc = await customerBLL.CreateCustomer(params)
        res.json(doc);
    })

    router.post("/update",async (req, res) => {
        const id = HttpParamValidators.MustBeString(req.query, "id", 2);
        const params: CustomerNS.UpdateCustomerParams = {} = req.body;
        const doc = await customerBLL.UpdateCustomer(id,params);
        res.json(doc);
    })

    router.post("/delete", async(req, res) =>  {
        const id = HttpParamValidators.MustBeString(req.query, "id", 2);
        await customerBLL.DeleteCustomer(id);
        res.json(1);
    })

    return router
}