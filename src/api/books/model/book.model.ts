import mongoose from "mongoose";
import { StoreDocument } from "../../stores/model/store.model";

export interface BookDocument extends mongoose.Document {
  name: string;
  size: number;
  price: string;
  stores: Array<StoreDocument>;
  createdAt: Date;
  updatedAt: Date;
}

export interface StoreBookDocument extends mongoose.Document {
  storeId: string;
  bookId: string;
}

export const BookSchema = new mongoose.Schema(
  {
    name: { type: String },
    size: { type: Number },
    price: { type: mongoose.Schema.Types.Decimal128 },
    stores: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Store"
      }
    ],
  },
  { 
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true
  },
);

BookSchema.virtual('Store', {
  ref: 'Store',
  localField: '_id',
  foreignField: 'bookId'
});

//  Intermediary Collection
const storeBookSchema = new mongoose.Schema({
  storeId: {type: mongoose.Schema.Types.ObjectId, ref: 'Store', required: true },
  bookId: {type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true }
});

export const BookModel = mongoose.model<BookDocument>("Book", BookSchema);
export const storeBookModel = mongoose.model('StoreBook', storeBookSchema);