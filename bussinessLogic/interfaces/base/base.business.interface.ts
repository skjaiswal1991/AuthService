import { IReadBussiness } from "../common/read.bussiness.interface";
import { IWriteBussiness } from "../common/write.bussiness.interface";
export interface IBaseBussiness<T>
  extends IReadBussiness<T>,
    IWriteBussiness<T> {}
