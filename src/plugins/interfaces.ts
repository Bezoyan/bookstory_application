import * as Hapi from "@hapi/hapi";
import { IDatabase } from "../db/connection";
import { IServerConfigurations } from "../config";

export interface IPluginOptions {
  database: IDatabase;
  serverConfigs: IServerConfigurations;
}

export interface IPlugin {
  register(server: Hapi.Server, options?: IPluginOptions): Promise<void>;
  info(): IPluginInfo;
}

export interface IPluginInfo {
  name: string;
  version: string;
}
