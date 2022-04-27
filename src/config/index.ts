import * as nconf from "nconf"
import * as path from "path";
import * as dotenv from "dotenv";

dotenv.config();


//Read Configurations
const configs = new nconf.Provider({
  env: true,
  argv: true,
  store: {
    type: "file",
    file: path.join(__dirname, './config.dev.json')
  }
});


export interface IServerConfigurations {
  host: string;
  port: number;
  routePrefix: string;
  plugins: Array<string>;
}

export interface IDataConfiguration {
  connectionString: string;
}

export function getDatabaseConfig(): IDataConfiguration {
  // console.log(configs.get("database"), 'fghfgh')
  // return configs.get("database");
  let conf =   {connectionString : "mongodb://localhost:27017/bookstore_db"};
  return conf;
}

export function getServerConfigs(): IServerConfigurations {
  // console.log(configs.get("server"), 'fghfgh')
  // return configs.get("server");
  const config = { 
    host: "localhost",
    port: 4000,
    routePrefix: "",
    plugins: ["logger"]
  }
  return config;
}
