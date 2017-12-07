import {ExtendableProxy} from './ExtendableProxy'

export class Point extends ExtendableProxy {
  [index: number]: number
  private _arr: number[]

  constructor(...args: number[]) {
    super({
      get: (target, property, reciever) => {
        if (property in target) {
          return target[property]
        } else {
          return target._arr[property]
        }
      },
      set: (target, property, value, reciever) => {
        let numericalKey = parseInt(property.toString())
        if (isNaN(numericalKey)) {
          return target[property] = value
        } else {
          return target._arr[numericalKey] = value
        }
      }
    })
    this._arr = new Array(...args)
  }

  add(p: Point|number[]): Point {
    return new Point(this.x+p[0], this.y+p[1])
  }

  get x() {
    return this._arr[0]
  }
  get y() {
    return this._arr[1]
  }
  set x(v) {
    this._arr[0] = v
  }
  set y(v) {
    this._arr[1] = v
  }
}