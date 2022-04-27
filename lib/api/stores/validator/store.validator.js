"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStoreModel = exports.createStoreModel = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createStoreModel = joi_1.default.object().keys({
    name: joi_1.default.string().required(),
    books: joi_1.default.array()
});
exports.updateStoreModel = joi_1.default.object().keys({
    name: joi_1.default.string().required(),
    books: joi_1.default.array(),
    completed: joi_1.default.boolean()
});
