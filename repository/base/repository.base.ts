import IRead from "../interfaces/base/read.interface";
import IWrite from "../interfaces/base/write.interface";
import * as mongoose from "mongoose";
import { Schema, Document, Model, Types } from "mongoose";

export class RepositoryBase<T extends Document> implements IRead<T>, IWrite<T> {
  private _model: Model<Document>;

  constructor(schemaModel: Model<Document>) {
    this._model = schemaModel;
  }

  findOnquery(query: Object, callback: (error: Error, result: any) => void) {
    this._model.find(query, callback);
  }

  create(item: T, callback: (error: any, result: any) => void) {
    this._model.create(item, callback);
  }
  find(callback: (error: any, result: any) => void) {
    this._model.find({}, callback);
  }
  findWithAnd(callback:(error:any,results:any)=>void,orConditions:Array<Object>){
     this._model.find({$and:orConditions},callback)
  }
  update(
    _id: mongoose.Types.ObjectId,
    item: T,
    callback: (error: any, result: any) => void
  ) {
    this._model.update({ _id: _id }, item, callback);
  }

  delete(_id: string, callback: (error: any, result: any) => void) {
    this._model.remove({ _id: this.toObjectId(_id) }, (err) =>
      callback(err, null)
    );
  }

  findOne(_id: string, callback: (error: any, result: T) => void) {
    this._model.findById(_id, callback);
  }

  findByPopulate = (callback, query, refKey) => {
    this._model
      .find(query)
      .populate(refKey)
      .exec(callback);
  };

  findByMultiplePopulateBase = (callback, query, refArray) => {
    let docs = this._model.find(query);
    const ittetaions = refArray.map((ref) => {
      docs = docs.populate(ref);
    });

    docs.find(query).exec(callback);
  };

  findByOption(callback: (error: any, result: any) => void, queryObject) {
    this._model.find(queryObject, callback);
  }

  findOneAndUpdate(_id: string, doc, callback, options = {}) {
    this._model.findOneAndUpdate({ _id: _id }, doc, callback);
  }

  private toObjectId(_id: string): Types.ObjectId {
    return Types.ObjectId.createFromHexString(_id);
  }
}
