"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeBookModel = exports.BookModel = exports.BookSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.BookSchema = new mongoose_1.default.Schema({
    name: { type: String },
    size: { type: Number },
    price: { type: mongoose_1.default.Schema.Types.Decimal128 },
    stores: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Store"
        }
    ],
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true
});
exports.BookSchema.virtual('Store', {
    ref: 'Store',
    localField: '_id',
    foreignField: 'bookId'
});
//  Intermediary Collection
const storeBookSchema = new mongoose_1.default.Schema({
    storeId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Store', required: true },
    bookId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Book', required: true }
});
exports.BookModel = mongoose_1.default.model("Book", exports.BookSchema);
exports.storeBookModel = mongoose_1.default.model('StoreBook', storeBookSchema);
