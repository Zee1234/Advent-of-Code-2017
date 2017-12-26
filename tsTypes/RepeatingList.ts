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
    if (v > -1) {
      return this._arr[ this.indexAt(v) ]
    } else {
      while ( v < 0) v += this._arr.length
      return this._arr[ this.indexAt(v) ]
    }
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

  insertAfter(value: T, pos: number) {
    let spot = this.indexAt(pos)+1
    let end = this._arr.slice(spot)
    this._arr[spot] = value
    let start = this._arr.slice(0,spot+1)
    this._arr = start.concat(end)
    return spot
  }

  indexOf(v: T) { return this._arr.indexOf(v) }

  get reduce() {
    return this._arr.reduce
  }
}