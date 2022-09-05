import { RepositoryBase } from "./base/repository.base";
import { UserModel } from "../models/user.model";
import UserSchemaModel from "../dataAccess/Schemas/user.schema";
import { IUserInterface } from "../models/Interfaces/user.interface";
// import RoleSchemaModel from "../dataAccess/Schemas/role.schema";
export class UserRepository extends RepositoryBase<IUserInterface> {
  constructor() {
    super(UserSchemaModel);
  }

  findByPopulateRole = (callback, query, refKey) => {
    // this.findByPopulate(callback, query, {
    //   path: refKey,
    //   Model: RoleSchemaModel,
    // });
  };
}

Object.seal(UserRepository);
