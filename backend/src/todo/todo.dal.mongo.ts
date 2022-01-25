import { FromMongoData, MongoDB, ToMongoData, MongoModel} from "../src/lib/mongodb";
import { TodoNS } from "./todo.ns";
export class TodoDalMongo implements TodoNS.DAL {
    constructor(private db: MongoDB) { }

    async init() { }

    private col_todo = this.db.collection<MongoModel<TodoNS.Todo>>("todo");

    async GetTodo(id: string) {
       const doc = await this.col_todo.findOne({ _id: id});
       return FromMongoData.One<TodoNS.Todo>(doc);
    }

    async ListTodo() {
        const docs = await this.col_todo.find().toArray();
        return FromMongoData.Many<TodoNS.Todo>(docs);
    }

    async UpdateTodo(todo: TodoNS.Todo) {
        const doc = ToMongoData.One(todo);
        await this.col_todo.updateOne({ _id: todo.id }, { $set: doc });
    }

    async CreateTodo(todo: TodoNS.Todo) {
        try {
            const doc = ToMongoData.One(todo);
            await this.col_todo.insertOne(doc);
        } catch (error) {
            if(error.code) throw TodoNS.Errors.ErrTodoExisted;
        }
    }
}