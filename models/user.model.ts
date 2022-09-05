import {IUserInterface} from './Interfaces/user.interface';

export class UserModel {
  private _userModel:IUserInterface;
  constructor(userModel:IUserInterface){
    this._userModel=userModel
  }
  get name():String{
     return this._userModel.fullName;
  }
  get phoneNumber():Number{
    return this._userModel.phoneNumber
  }
  get role():string{
    return this._userModel.role.toString();
  }
}
Object.seal(UserModel);