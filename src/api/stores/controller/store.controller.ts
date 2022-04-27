import Hapi from "@hapi/hapi";
import * as Boom from "@hapi/boom";
import { StoreDocument, StoreModel } from "../model/store.model";
import { IDatabase } from "../../../db/connection";
import { IServerConfigurations } from "../../../config";
import { IRequest } from "../../../interface/request";

export default class StoreController {
  private database: IDatabase;
  private configs: IServerConfigurations;

  constructor(configs: IServerConfigurations, database: IDatabase) {
    this.configs = configs;
    this.database = database;
  }

  public async createStore(request: IRequest, h: Hapi.ResponseToolkit) {
    const newStore: StoreDocument = <StoreDocument>request.payload;
    //newStore.store = request.auth.credentials.id;

    try {
      let store: StoreDocument = await this.database.storeModel.create(newStore);
      return h.response(store).code(201);
    } catch (error: any) {
      return Boom.badImplementation(error);
    }
  }

  public async updateStore(request: IRequest, h: Hapi.ResponseToolkit) {
    let _id = request.params["id"];
    const updatedStore: StoreDocument = <StoreDocument>request.payload;

    try {
      let store  = await this.database.storeModel.findByIdAndUpdate(
        { _id},
        { $set: updatedStore },
        { new: true }
      )
      if (store) {
        return store;
      } else {
        return Boom.notFound();
      }
    } catch (error: any) {
      return Boom.badImplementation(error);
    }
  }

  public async deleteStore(request: IRequest, h: Hapi.ResponseToolkit) {
    let id = request.params["id"];

    let deletedStore = await this.database.storeModel.findOneAndRemove({
      _id: id
    });

    if (deletedStore) {
      return true;
    } else {
      return Boom.notFound();
    }
  }

  public async getStoreById(request: IRequest, h: Hapi.ResponseToolkit) {
    let _id = request.params["id"];

    let store = await this.database.storeModel.findOne({ _id })
      .lean(true)
      .populate('books');

    if (store) {
      return store;
    } else {
      return Boom.notFound();
    }
  }

  public async getStores(request: IRequest, h: Hapi.ResponseToolkit) {
    let top = request.query["top"];
    let skip = request.query["skip"];
    let stores = await this.database.storeModel
      .find()
      .populate('books')
      .lean(true)
      .skip(skip)
      .limit(top);

    return stores;
  }
}
