import { UserRepository } from "../repository/user.repository";
import { IUserBussiness } from "./interfaces/user.bussiness.interface";
import { IUserInterface } from "../models/Interfaces/user.interface";

export class UserBussiness implements IUserBussiness {
  private _userRepository: UserRepository;

  constructor() {
    this._userRepository = new UserRepository();
  }

  findWithAnd(callback,andArray){
    this._userRepository.findWithAnd(callback,andArray);
  }

  create(item: IUserInterface, callback: (error: any, result: any) => void) {
    this._userRepository.create(item, callback);
  }

  update(
    _id: string,
    item: IUserInterface,
    callback: (error: any, result: any) => void
  ) {
    this._userRepository.findOne(_id, (err, res) => {
      if (err) callback(err, res);
      else this._userRepository.update(res._id, item, callback);
    });
  }

  find(
    callback: (error: any, result: Array<IUserInterface>) => void,
    queryObject = {},
    withOption: boolean = true
  ) {
    withOption
      ? this._userRepository.findByOption(callback, queryObject)
      : this._userRepository.find(callback);
  }

  findByPopulate = (callback, query, refkey) => {
    this._userRepository.findByPopulateRole(callback, query, refkey);
  };

  findOne(_id: string, callback: (error: any, result: IUserInterface) => void) {
    this._userRepository.findOne(_id, callback);
  }

  delete(_id: string, callback: (error: any, result: any) => void) {
    this._userRepository.delete(_id, callback);
  }

  findOneAndUpdate(
    _id: string,
    doc,
    callback: (error: any, result: any) => void
  ) {
    this._userRepository.findOneAndUpdate(_id, doc, callback);
  }
}
