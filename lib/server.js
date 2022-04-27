'use strict';
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const Hapi = __importStar(require("@hapi/hapi"));
const Boom = __importStar(require("@hapi/boom"));
const Books = __importStar(require("./api/books"));
const Stores = __importStar(require("./api/stores"));
function init(configs, database) {
    return __awaiter(this, void 0, void 0, function* () {
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
                }
            });
            if (configs.routePrefix) {
                server.realm.modifiers.route.prefix = configs.routePrefix;
            }
            // Setup Hapi Plugins
            const plugins = configs.plugins;
            const pluginOptions = {
                database: database,
                serverConfigs: configs
            };
            let pluginPromises = [];
            plugins.forEach((pluginName) => {
                var plugin = require("./plugins/" + pluginName).default();
                console.log(`Register Plugin ${plugin.info().name} v${plugin.info().version}`);
                pluginPromises.push(plugin.register(server, pluginOptions));
            });
            yield Promise.all(pluginPromises);
            // Getting Routes
            Books.init(server, configs, database);
            Stores.init(server, configs, database);
            return server;
        }
        catch (error) {
            throw Boom.badImplementation(error);
        }
    });
}
exports.init = init;
