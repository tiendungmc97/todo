import express from "express"
import { HttpParamValidators } from "../lib/http";
import { TodoNS } from "./todo.ns";

export function NewTodoApi(todoBLL: TodoNS.BLL) {
    const router = express.Router();

    router.get("/get", async (req, res) => {
        const id = HttpParamValidators.MustBeString(req.query, "id", 2);
        const doc = await todoBLL.GetTodo(id)
        res.json(doc);
    })

    router.get("/list", async (req, res) => {
        const docs = await todoBLL.ListTodo();
        res.json(docs);
    })

    router.post("/create", async (req, res) => {
        const params: TodoNS.CreateTodoParams = {
            name: HttpParamValidators.MustBeString(req.body, "name", 2)
          };
        if(req.body.note) params.note = HttpParamValidators.MustBeString(req.body, "note", 2);
        const doc = await todoBLL.CreateTodo(params)
        res.json(doc);
    })

    router.post("/update", async (req, res) => {
        const id = HttpParamValidators.MustBeString(req.query, "id", 8);
        const params: TodoNS.UpdateTodoParams = {} = req.body;
        const doc = await todoBLL.UpdateTodo(id, params)
        res.json(doc);
    })

    router.post("/delete", async (req, res) => {
        const id = HttpParamValidators.MustBeString(req.query, "id", 8);
        await todoBLL.DeleteTodo(id);
        res.json(1);
    })

    return router;
}