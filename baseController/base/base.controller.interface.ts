import { IReadController } from "../common/read.controller.inteface";
import { IWriteController } from "../common/write.controller.interface";
import { IBaseBussiness } from "../../bussinessLogic/interfaces/base/base.business.interface";

export interface IBaseController<T extends IBaseBussiness<Object>>
  extends IReadController,
    IWriteController {}
