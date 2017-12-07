export class RepeatingList<T> {
  private _arr: Array<T>

  constructor(...values: T[]) {
    this._arr = values.map( v => v )
  }

  valueAt(v: number) {
    return this._arr[ v % this._arr.length ]
  }
}