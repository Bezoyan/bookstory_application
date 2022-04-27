import * as Hapi from "@hapi/hapi";
import  BookRoutes  from "./routes/book.routes";
import { IDatabase } from "../../db/connection";
import { IServerConfigurations } from "../../config";

export function init(server: Hapi.Server, configs: IServerConfigurations, database: IDatabase) {
  BookRoutes(server, configs, database);
}
