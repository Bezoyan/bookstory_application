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
const book_controller_1 = __importDefault(require("../controller/book.controller"));
const BookValidator = __importStar(require("../validator/book.validator"));
function default_1(server, configs, database) {
    const bookController = new book_controller_1.default(configs, database);
    server.bind(bookController);
    server.route({
        method: "GET",
        path: "/book/{id}",
        options: {
            handler: bookController.getBookById,
            tags: ["api", "books"],
            description: "Get book by id",
            validate: {
                params: joi_1.default.object({
                    id: joi_1.default.string().min(3).max(100)
                })
            }
        }
    });
    server.route({
        method: "GET",
        path: "/books",
        options: {
            handler: bookController.getBooks,
            tags: ["api", "books"],
            description: "Get all books.",
            response: {
                schema: joi_1.default.array().items(),
                failAction: 'log'
            },
            validate: {
                query: joi_1.default.object({
                    top: joi_1.default.number().integer().min(1).max(100).default(20),
                    skip: joi_1.default.number().integer().min(1).max(100).default(0)
                }),
            }
        }
    });
    server.route({
        method: "DELETE",
        path: "/book/{id}",
        options: {
            handler: bookController.deleteBook,
            tags: ["api", "books"],
            description: "Delete book by id.",
            validate: {
                params: joi_1.default.object({
                    id: joi_1.default.string().min(3).max(100)
                })
            }
        }
    });
    server.route({
        method: "PUT",
        path: "/book/{id}",
        options: {
            handler: bookController.updateBook,
            tags: ["api", "books"],
            description: "Update book by id",
            validate: {
                params: joi_1.default.object({
                    id: joi_1.default.string().min(3).max(100)
                }),
                payload: BookValidator.updateBookModel
            }
        }
    });
    server.route({
        method: "POST",
        path: "/book",
        options: {
            handler: bookController.createBook,
            tags: ["api", "books"],
            description: "Create a book.",
            validate: {
                payload: BookValidator.createBookModel
            }
        }
    });
    // Caching data with server method
    server.method('getBooks', bookController.getBooks, {
        cache: {
            expiresIn: 60000,
            staleIn: 30000,
            staleTimeout: 10000,
            generateTimeout: 100
        }
    });
    server.route({
        method: 'GET',
        path: '/books/cache',
        options: {
            handler() {
                return server.methods.getBooks();
            }
        }
    });
}
exports.default = default_1;
