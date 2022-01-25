import { TodoNS } from "./todo.ns";
import { FilterData } from "../ext/parse_data";
export class TodoBllBase implements TodoNS.BLL {
    constructor(private dal: TodoNS.DAL) { }

    async init() { }

    async GetTodo(id: string) {
        const doc = await this.dal.GetTodo(id);
        return doc;
    }

    async ListTodo() {
        const docs = await this.dal.ListTodo();
        const todos = FilterData<TodoNS.Todo>(docs);
        return todos
    }

    async CreateTodo(params: TodoNS.CreateTodoParams) {
        const now = Date.now();
        let todo: TodoNS.Todo = {
            id: TodoNS.Generator.NewTodoId(),
            name: params.name,
            ctime: now,
            mtime: now,
        }
        if(params.note) todo.note = params.note;
        await this.dal.CreateTodo(todo);
        return todo;
    }
    
    async UpdateTodo(id: string, params: TodoNS.UpdateTodoParams) {
        const todo = await this.GetTodo(id);
        const doc = {...todo, ...params};
        doc.mtime = Date.now();
        await this.dal.UpdateTodo(doc);
        return doc;
    }

    async DeleteTodo(id: string) {
        const doc = await this.GetTodo(id);
        doc.dtime = Date.now();
        await this.dal.UpdateTodo(doc);
    }
}