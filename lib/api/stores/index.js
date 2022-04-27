"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const store_routes_1 = __importDefault(require("./routes/store.routes"));
function init(server, configs, database) {
    (0, store_routes_1.default)(server, configs, database);
}
exports.init = init;
