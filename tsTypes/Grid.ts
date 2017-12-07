import {ExtendableProxy} from './ExtendableProxy'

type SubGridProxyGet<T> = (target: SubGrid<T>, property: number, reciever: SubGrid<T>) => T
type SubGridProxySet<T> = (target: SubGrid<T>, property: number, value: T, reciever: SubGrid<T>) => boolean
interface SubGridProxy<T> extends ProxyHandler<SubGrid<T>> {
  get: SubGridProxyGet<T>,
  set: SubGridProxySet<T>
}
class SubGrid<T> extends ExtendableProxy {
  [index: number]: T
  subgrid: {
    [index: number]: T
  }

  constructor() {
    super({
      get: (target, property, reciever) => {
        let p = parseInt(property.toString())
        if (isNaN(p)) {
          return target[property]
        } else {
          target.subgrid = target.subgrid || {}
          return target.subgrid[property]
        }
      },
      set: (target, property, value, reciever) => {
        target.subgrid = target.subgrid || {}
        try {
          target.subgrid[property] = value
        } catch(e) {
          return e
        }
        return true
      },
    } as SubGridProxy<T>)
  }
}





function merge<T>(newOne: Grid<T>) {
  return (value: T, x: number, y: number) => {
    newOne[x][y] = value
  }
}

interface subArray extends Array<number> {
  1: number,
  2?: number
}
type GridProxyGet<T> = (target: Grid<T>, property: number, reciever: Grid<T>) => SubGrid<T>
interface GridProxy<T> extends ProxyHandler<Grid<T>> {
  get: GridProxyGet<T>
}
export class Grid<T> extends ExtendableProxy {
  [index: number]: SubGrid<T>
  grid: {
    [key: number]: SubGrid<T>
  }
  constructor(original?: Grid<T>) {
    super({
      get: (target, property, reciever) => {
        let p = parseInt(property.toString())
        if (isNaN(p)) {
          return target[property]
        } else {
          target.grid[property] = target.grid[property] || new SubGrid<T>()
          return target.grid[property]
        }
      }
    } as GridProxy<T>)
    this.grid = {}
    if (original) original.forEach(merge(this))
  }

  forEach(callback: (value: T, x?: number, y?: number, self?: Grid<T>) => void) {
    Object.keys(this.grid).forEach( xs => {
      let x = parseInt(xs)
      Object.keys(this[x].subgrid).forEach( ys => {
        let y = parseInt(ys)
        callback(this[x][y], x, y, this)
      })
    })
  }

  merge(other: Grid<T>): Grid<T> {
    let ret = this.clone()
    other.forEach(merge(ret))
    return ret
  }

  map(callback: (value: T, x?: number, y?: number, self?: Grid<T>) => T ): Grid<T>{
    let ret = this.clone()
    ret.forEach( (v, x, y, s) => ret[x][y] = callback(v, x, y, s) )
    return ret
  }

  clone(): Grid<T> {
    // let ret = new Grid<T>()
    // this.forEach(merge(ret))
    // return ret
    return new Grid(this)
  }

  reduce(callback: (accumulator: T, value: T, x?: number, y?: number, self?: Grid<T>) => T): T
  reduce(callback: (accumulator: T, value: T, x?: number, y?: number, self?: Grid<T>) => T, accumulator: T): T
  reduce<U>(callback: (accumulator: U, value: T, x?: number, y?: number, self?: Grid<T>) => U, accumulator: U=undefined): U {
    this.forEach( (v, x, y, s) => {
      accumulator = callback(accumulator, v, x, y, s)
    })
    return accumulator
  }

  sub([x]: [number], [y]: [number]): Grid<T>
  sub([x1, x2]: [number, number], [y1, y2]: [number, number]): Grid<T>
  sub(xArr: number[], yArr: number[]): Grid<T>{
    let x1 = xArr[0]
      , x2 = !isNaN(xArr[1]) ? xArr[1] : x1
      , y1 = yArr[0]
      , y2 = !isNaN(yArr[1]) ? yArr[1] : y1

    let ret = new Grid<T>()
    if (x2 < x1) [x1, x2] = [x2, x1]
    if (y2 < y1) [y1, y2] = [y2, y1]
    for (let x = x1; x <= x2; x+=1) {
      for (let y = y1; y <= y2; y+=1) {
        ret[x][y] = this[x][y]
      }
    }
    return ret
  }
}