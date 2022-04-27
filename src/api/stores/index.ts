import * as Hapi from "@hapi/hapi";
import  StoreRoutes  from "./routes/store.routes";
import { IDatabase } from "../../db/connection";
import { IServerConfigurations } from "../../config";

export function init(server: Hapi.Server, configs: IServerConfigurations, database: IDatabase) {
    StoreRoutes(server, configs, database);
}

