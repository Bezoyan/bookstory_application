import Hapi from "@hapi/hapi";
import * as Boom from "@hapi/boom";
import { BookDocument, storeBookModel } from "../model/book.model";
import { IDatabase } from "../../../db/connection";
import { IServerConfigurations } from "../../../config";
import { IRequest } from "../../../interface/request";

export default class BookController {
  private database: IDatabase;
  private configs: IServerConfigurations;

  constructor(configs: IServerConfigurations, database: IDatabase) {
    this.configs = configs;
    this.database = database;
  }
  public async createBook(request: IRequest, h: Hapi.ResponseToolkit) {
    const newBook: BookDocument = <BookDocument>request.payload;

    try {
      let book: BookDocument = await this.database.bookModel.create(newBook);
      for( let store of book.stores ){
        let storeBook = await this.database.storeModel.updateMany(
          { _id: store._id },
          {$set: {books: book} },
          { 'upsert': true }
        );
      }
      return h.response(book).code(201);
    } catch (error: any) {
      return Boom.badImplementation(error);
    }
  }

  public async updateBook(request: IRequest, h: Hapi.ResponseToolkit) {
    const updatedBook: BookDocument = <BookDocument>request.payload;
    let _id = request.params["id"];

    try {
      let book = await this.database.bookModel.findByIdAndUpdate(
        { _id },
        { $set: updatedBook },
        { new: true }
      );

      if (book) {
        return book;
      } else {
        return Boom.notFound();
      }
    } catch (error: any) {
      return Boom.badImplementation(error);
    }
  }

  public async deleteBook(request: IRequest, h: Hapi.ResponseToolkit) {
    let id = request.params["id"];

    let deletedBook = await this.database.bookModel.findOneAndRemove({
      _id: id
    });

    if (deletedBook) {
      return true;
    } else {
      return Boom.notFound();
    }
  }

  public async getBookById(request: IRequest, h: Hapi.ResponseToolkit) {
    let _id = request.params["id"];

    let book = await this.database.bookModel.findOne({ _id }).populate('stores')
      .lean(true);

    if (book) {
      return book;
    } else {
      return Boom.notFound();
    }
  }

  public async getBooks(request: IRequest, h: Hapi.ResponseToolkit) {
    let top = request.query["top"];
    let skip = request.query["skip"];
    try {

      let books = await this.database.bookModel
        .find()
        .populate({
          path: 'stores',
          populate: { path: '_id' }
        })
        .lean(true)
        .skip(skip)
        .limit(top);
  
      return books;
    } catch(err) {
      console.log(err)
    }
  }

}
