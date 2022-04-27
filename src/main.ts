import * as Server from "./server";
import * as Database from "./db/connection";
import * as Configs from "./config";
import * as dotenv from "dotenv";

dotenv.config();
console.log(`Running environment ${process.env.NODE_ENV || "dev"}`);

// Catch unhandling unexpected exceptions
process.on("uncaughtException", (error: Error) => {
  console.error(`uncaughtException ${error.message}`);
});

// Catch unhandling rejected promises
process.on("unhandledRejection", (reason: any) => {
  console.error(`unhandledRejection ${reason}`);
});

// Define async start function
const start = async ({ config, db } : any ) => {
  try {
    const server = await Server.init(config, db);
    await server.start();
    console.log(`Listening on ${server.settings.host}:${server.settings.port}`);
  } catch (err: any) {
    console.error("Error starting server: ", err);
    throw err;
  }
};

// Init Database
const dbConfigs = Configs.getDatabaseConfig();
const database = Database.init(dbConfigs);

// Starting Application Server
const serverConfigs = Configs.getServerConfigs();

// Start the server
start({ config: serverConfigs , db: database });
