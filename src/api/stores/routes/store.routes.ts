import * as Hapi from "@hapi/hapi";
import Joi from "joi";
import StoreController from "../controller/store.controller";
import * as StoreValidator from "../validator/store.validator";
import { IDatabase } from "../../../db/connection";
import { IServerConfigurations } from "../../../config";

export default function (
  server: Hapi.Server,
  configs: IServerConfigurations,
  database: IDatabase
) {
  const storeController = new StoreController(configs, database);
  server.bind(storeController);

  server.route({
    method: "GET",
    path: "/store/{id}",
    options: {
      handler: storeController.getStoreById,
        tags: ["api", "stores"],
        description: "Get store by id.",
        validate: {
          params: Joi.object({
            id: Joi.string().min(3).max(100)
          })
        }
    }
  });

  server.route({
    method: "GET",
    path: "/stores",
    options: {
      handler: storeController.getStores,
      tags: ["api", "stores"],
      description: "Get all stores.",
      validate: {
        query: Joi.object({
          top: Joi.number().integer().min(1).max(100).default(20),
          skip: Joi.number().integer().min(1).max(100).default(0)
        })
      }
    }
  });

  server.route({
    method: "DELETE",
    path: "/store/{id}",
    options: {
      handler: storeController.deleteStore,
      tags: ["api", "stores"],
      description: "Delete store by id.",
      validate: {
        params: Joi.object({
          id: Joi.string().min(3).max(100)
        })
      }
    }
  });

  server.route({
    method: "PUT",
    path: "/store/{id}",
    options: {
      handler: storeController.updateStore,
      tags: ["api", "stores"],
      description: "Update task by id.",
      validate: {
        params: Joi.object({
          id: Joi.string().min(3).max(100)
        }),
        payload: StoreValidator.updateStoreModel
      }
    }
  });

  server.route({
    method: "POST",
    path: "/store",
    options: {
      handler: storeController.createStore,
      tags: ["api", "stores"],
      description: "Create a store.",
      validate: {
        payload: StoreValidator.createStoreModel
      },
      plugins: {
        "hapi-swagger": {
          responses: {
            "201": {
              description: "Created book."
            }
          }
        }
      }
    }
  });
}