import * as Hapi from "@hapi/hapi";
import Joi from "joi";
import BookController from "../controller/book.controller";
import * as BookValidator from "../validator/book.validator";
import { IDatabase } from "../../../db/connection";
import { IServerConfigurations } from "../../../config";
import { request } from "http";

export default function (
  server: Hapi.Server,
  configs: IServerConfigurations,
  database: IDatabase
) {
  const bookController = new BookController(configs, database);
  server.bind(bookController);

  server.route({
    method: "GET",
    path: "/book/{id}",
    options: {
      handler: bookController.getBookById,
      tags: ["api", "books"],
      description: "Get book by id",
      validate: {
        params: Joi.object({
          id: Joi.string().min(3).max(100)
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
        schema: Joi.array().items(),
        failAction: 'log'
      },
      validate: {
        query: Joi.object({
          top: Joi.number().integer().min(1).max(100).default(20),
          skip: Joi.number().integer().min(1).max(100).default(0)
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
        params: Joi.object({
          id: Joi.string().min(3).max(100)
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
        params: Joi.object({
          id: Joi.string().min(3).max(100)
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
      handler () {
        return server.methods.getBooks();
      }
    }
  });
}