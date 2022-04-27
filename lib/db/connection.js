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
exports.init = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const store_model_1 = require("../api/stores/model/store.model");
const book_model_1 = require("../api/books/model/book.model");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
function init(config) {
    mongoose_1.default.Promise = Promise;
    mongoose_1.default.connect("mongodb://localhost:27017/bookstore_db");
    let mongoDb = mongoose_1.default.connection;
    mongoDb.on("error", () => {
        console.log(`Unable to connect to database: ${config.connectionString}`);
    });
    mongoDb.once("open", () => {
        console.log(`Connected to database: ${config.connectionString}`);
    });
    return {
        storeModel: store_model_1.StoreModel,
        bookModel: book_model_1.BookModel,
        storeBookModel: book_model_1.storeBookModel
    };
}
exports.init = init;
