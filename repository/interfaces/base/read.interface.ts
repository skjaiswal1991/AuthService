export default interface read<T> {
  find: (callback: (error: any, result: Array<T>) => void) => void;
  findOne: (id: string, callback: (error: any, result: T) => void) => void;
  findOnquery: (
    query: Object,
    callback: (error: Error, result: T) => void
  ) => void;
}
