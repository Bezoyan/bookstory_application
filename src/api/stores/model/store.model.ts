import mongoose from "mongoose";
import config from "config";
import { BookDocument } from "../../books/model/book.model";

export interface StoreDocument extends mongoose.Document {
  //storeId: string;
  books: Array<BookDocument>;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export const StoreSchema = new mongoose.Schema(
  { 
    //storeId: { type: String, required: true },
    name: { type: String, required: true },
    books: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book"
      }
    ]
  },
  { 
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true 
  }
);

StoreSchema.virtual('Book', {
  ref: 'Book',
  localField: '_id',
  foreignField: 'bookId'
});

export const StoreModel = mongoose.model<StoreDocument>("Store", StoreSchema);