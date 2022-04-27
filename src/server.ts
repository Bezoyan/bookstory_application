'use strict';

import * as Hapi from "@hapi/hapi";
import * as Boom from "@hapi/boom";
import { IPlugin } from "./plugins/interfaces";
import { IServerConfigurations } from "./config";
import * as Books from "./api/books";
import * as Stores from "./api/stores";
import { IDatabase } from "./db/connection";
// import CatboxRedis from '@hapi/catbox-redis';

export async function init(
  configs: IServerConfigurations,
  database: IDatabase
): Promise<Hapi.Server> {
  try {
    const port = process.env.PORT;
    const server = new Hapi.Server({
      debug: { request: ['error'] },
      host: '0.0.0.0',
      port: port,
      routes: {
        cors: {
          origin: ["*"]
        }
      },
    //   cache: [
    //     {
    //         name: 'book_cache',
    //         provider: {
    //             constructor: CatboxRedis,
    //             options: {
    //                 partition : 'book_cached_data',
    //                 host: 'redis-cluster.domain.com',
    //                 port: 6379,
    //                 database: 0,
    //                 tls: {}
    //             }
    //         }
    //     }
    // ]
    });

    if (configs.routePrefix) {
      server.realm.modifiers.route.prefix = configs.routePrefix;
    }

    // Setup Hapi Plugins
    const plugins: Array<string> = configs.plugins;
    const pluginOptions = {
      database: database,
      serverConfigs: configs
    };

    let pluginPromises: Promise<any>[] = [];

    plugins.forEach((pluginName: string) => {
      var plugin: IPlugin = require("./plugins/" + pluginName).default();
      console.log(
        `Register Plugin ${plugin.info().name} v${plugin.info().version}`
      );
      pluginPromises.push(plugin.register(server, pluginOptions));
    });

    await Promise.all(pluginPromises);

    
    // Getting Routes
    Books.init(server, configs, database);
    Stores.init(server, configs, database);


    return server;
  } catch (error: any) {
    throw Boom.badImplementation(error);
  }
}
