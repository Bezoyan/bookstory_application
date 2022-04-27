import mongoose from "mongoose";
import { IDataConfiguration } from "../config";
import { StoreDocument, StoreModel } from "../api/stores/model/store.model";
import { BookDocument, BookModel, storeBookModel, StoreBookDocument } from "../api/books/model/book.model";
import * as dotenv from "dotenv";

dotenv.config();

export interface IDatabase {
  storeModel: mongoose.Model<StoreDocument>;
  bookModel: mongoose.Model<BookDocument>;
  storeBookModel: mongoose.Model<StoreBookDocument>
}

export function init(config: IDataConfiguration): IDatabase {
  (<any>mongoose).Promise = Promise;
  mongoose.connect("mongodb://localhost:27017/bookstore_db");

  let mongoDb = mongoose.connection;

  mongoDb.on("error", () => {
    console.log(`Unable to connect to database: ${config.connectionString}`);
  });

  mongoDb.once("open", () => {
    console.log(`Connected to database: ${config.connectionString}`);
  });

  return {
    storeModel: StoreModel,
    bookModel: BookModel,
    storeBookModel: storeBookModel
  };
}
