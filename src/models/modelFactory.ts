export class ModelFactory<T, M = T> {
  static modelClass: { new (): any };

  static createEntity<M>(data?: Partial<M>) {
    const entity = new this.modelClass();
    if (data) {
      (Object.keys(data) as (keyof M)[]).forEach((key) => {
        if (Object.prototype.hasOwnProperty.call(entity, key)) {
          entity[key] = data[key];
        }
      });
    }

    return entity;
  }
}
