"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const book_routes_1 = __importDefault(require("./routes/book.routes"));
function init(server, configs, database) {
    (0, book_routes_1.default)(server, configs, database);
}
exports.init = init;
