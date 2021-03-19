export class Deferred<T = any> {
  resolve: (value?: T) => void;

  reject: (value: any) => void;

  promise = new Promise<T>((resolve, reject) => {
    this.resolve = resolve;
    this.reject = reject;
  });
}
