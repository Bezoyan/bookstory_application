"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBookModel = exports.createBookModel = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createBookModel = joi_1.default.object().keys({
    name: joi_1.default.string().required(),
    size: joi_1.default.number().required(),
    price: joi_1.default.number().required(),
    stores: joi_1.default.array().required(),
});
exports.updateBookModel = joi_1.default.object().keys({
    name: joi_1.default.string().required(),
    size: joi_1.default.number().required(),
    price: joi_1.default.number().required(),
    stores: joi_1.default.array().required(),
    completed: joi_1.default.boolean()
});
