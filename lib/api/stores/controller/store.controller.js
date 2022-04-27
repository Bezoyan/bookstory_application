"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Boom = __importStar(require("@hapi/boom"));
class StoreController {
    constructor(configs, database) {
        this.configs = configs;
        this.database = database;
    }
    createStore(request, h) {
        return __awaiter(this, void 0, void 0, function* () {
            const newStore = request.payload;
            //newStore.store = request.auth.credentials.id;
            try {
                let store = yield this.database.storeModel.create(newStore);
                return h.response(store).code(201);
            }
            catch (error) {
                return Boom.badImplementation(error);
            }
        });
    }
    updateStore(request, h) {
        return __awaiter(this, void 0, void 0, function* () {
            let _id = request.params["id"];
            const updatedStore = request.payload;
            try {
                let store = yield this.database.storeModel.findByIdAndUpdate({ _id }, { $set: updatedStore }, { new: true });
                if (store) {
                    return store;
                }
                else {
                    return Boom.notFound();
                }
            }
            catch (error) {
                return Boom.badImplementation(error);
            }
        });
    }
    deleteStore(request, h) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = request.params["id"];
            let deletedStore = yield this.database.storeModel.findOneAndRemove({
                _id: id
            });
            if (deletedStore) {
                return true;
            }
            else {
                return Boom.notFound();
            }
        });
    }
    getStoreById(request, h) {
        return __awaiter(this, void 0, void 0, function* () {
            let _id = request.params["id"];
            let store = yield this.database.storeModel.findOne({ _id })
                .lean(true)
                .populate('books');
            if (store) {
                return store;
            }
            else {
                return Boom.notFound();
            }
        });
    }
    getStores(request, h) {
        return __awaiter(this, void 0, void 0, function* () {
            let top = request.query["top"];
            let skip = request.query["skip"];
            let stores = yield this.database.storeModel
                .find()
                .populate('books')
                .lean(true)
                .skip(skip)
                .limit(top);
            return stores;
        });
    }
}
exports.default = StoreController;
