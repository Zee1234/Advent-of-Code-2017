export class RepeatingList<T> {
  private _arr: Array<T>

  constructor(...values: T[]) {
    this._arr = values.map( v => v )
  }

  get length() {
    return this._arr.length
  }
  
  indexAt(v: number) {
    return v % this.length
  }

  valueAt(v: number) {
    return this._arr[ this.indexAt(v) ]
  }

  setValueAt(index: number, value: T) {
    this._arr[ this.indexAt(index) ] = value
  }

  subList(start: number, length: number) {
    if (length > this.length) throw new Error('Cannot make sub List larger than original')
    let arr = []
    for (let i = start; i < start + length; i++) arr.push(this.valueAt(i))
    return new RepeatingList(...arr)
  }

  mergeMaintainSize(other: RepeatingList<T>, start: number = 0) {
    if (other.length > this.length) throw new Error('Merge size cannot be greater than original size!')
    let list = new RepeatingList(...this._arr)
    for (let i = 0; i < other.length; i++) list.setValueAt(i+start, other.valueAt(i))
    return list
  }

  reverse() {
    return new RepeatingList(...this._arr.reverse())
  }

  get reduce() {
    return this._arr.reduce
  }
}