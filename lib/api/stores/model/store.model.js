"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreModel = exports.StoreSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.StoreSchema = new mongoose_1.default.Schema({
    //storeId: { type: String, required: true },
    name: { type: String, required: true },
    books: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Book"
        }
    ]
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true
});
exports.StoreSchema.virtual('Book', {
    ref: 'Book',
    localField: '_id',
    foreignField: 'bookId'
});
exports.StoreModel = mongoose_1.default.model("Store", exports.StoreSchema);
