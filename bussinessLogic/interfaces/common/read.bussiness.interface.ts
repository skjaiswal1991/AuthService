export interface IReadBussiness<T> {
  find: (
    callback: (error: any, result: Array<T>) => void,
    queryObject: Object,
    withOption: boolean
  ) => void;
  findOne: (_id: string, callback: (error: any, result: T) => void) => void;
}
