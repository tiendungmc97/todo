import express from "express";
import cors from "cors";
import "./ext/log";
import "lib/express"
import { MongoCommon } from "./lib/mongodb"
import { ContextBLLBase } from "./ext/ctx.bll";

import { TodoDalMongo } from "./todo/todo.dal.mongo";
import { TodoBllBase } from "./todo/todo.bll.base";
import { NewTodoApi } from "./todo/todo.api";


import { ReadConfig } from "./config";
import { HttpErrorHandler } from "./ext/http_error_handler";

async function main() {
    const config = await ReadConfig();
    console.log(config);
    const client = await MongoCommon.Connect(config.database.db_url, { replica: true });
    console.log('connected to database');
    const database = client.db(config.database.db_name);
    //*********************************************************************//
    const contextBLL = new ContextBLLBase(client);

    const todoDal = new TodoDalMongo(database);
    await todoDal.init();
    const todoBll = new TodoBllBase(todoDal);
    await todoBll.init();

    //*********************************************************************//
    const app = express();
    app.disable("x-powered-by");
    app.use(express.json());
    app.use(cors());
    ////////////////////////////////////////////////////////////////////////
    app.use("/api/todo", NewTodoApi(todoBll));

    app.use(HttpErrorHandler);
    console.log(`Listen on ${config.server.port}`);
    app.listen(config.server.port, "0.0.0.0", () => {
        // const err = arguments[0];
        // if (err) {
        //     console.log(err);
        // }
    });
}

main().catch(err => {
    console.log(err)
});

