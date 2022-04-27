"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const store_controller_1 = __importDefault(require("../controller/store.controller"));
const StoreValidator = __importStar(require("../validator/store.validator"));
function default_1(server, configs, database) {
    const storeController = new store_controller_1.default(configs, database);
    server.bind(storeController);
    server.route({
        method: "GET",
        path: "/store/{id}",
        options: {
            handler: storeController.getStoreById,
            tags: ["api", "stores"],
            description: "Get store by id.",
            validate: {
                params: joi_1.default.object({
                    id: joi_1.default.string().min(3).max(100)
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
                query: joi_1.default.object({
                    top: joi_1.default.number().integer().min(1).max(100).default(20),
                    skip: joi_1.default.number().integer().min(1).max(100).default(0)
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
                params: joi_1.default.object({
                    id: joi_1.default.string().min(3).max(100)
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
                params: joi_1.default.object({
                    id: joi_1.default.string().min(3).max(100)
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
exports.default = default_1;
