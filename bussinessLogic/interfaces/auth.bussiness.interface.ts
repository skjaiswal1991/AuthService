import { IUserInterface } from "../../models/Interfaces/user.interface";

export interface IAuthBussiness<T> {
  
  handleSingup(user: IUserInterface): Promise<Object>;
}
