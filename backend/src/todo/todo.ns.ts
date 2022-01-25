import rand from "../lib/rand";

export namespace TodoNS {
    export interface Todo {
        id: string;
        name: string;
        note?: string;
        ctime: number;
        mtime: number;
        dtime?: number;
    }

    export interface CreateTodoParams {
        name: string;
        note?: string;
    }

    export interface UpdateTodoParams {
        name?: string;
        note?: string;
    }

    export interface BLL {
        GetTodo(id: string): Promise<Todo>;
        ListTodo(): Promise<Todo[]>;
        CreateTodo(params: CreateTodoParams): Promise<Todo>;
        UpdateTodo(id: string, params:UpdateTodoParams): Promise<Todo>;
        DeleteTodo(id: string): Promise<void>;
    }

    export interface DAL {
        GetTodo(id: string): Promise<Todo>;
        ListTodo(): Promise<Todo[]>;
        CreateTodo(todo: Todo): Promise<void>;
        UpdateTodo(todo: Todo): Promise<void>;    
    }

    export const Errors = {
        TodoNotFound: new Error("Todo not found"),
        ErrTodoExisted: new Error("Todo existed"),
    }

    export const Generator = {
        NewTodoId: () => rand.uppercase(8),
    }
}