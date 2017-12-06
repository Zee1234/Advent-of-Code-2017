export class RepeatingList<T> {
  private _arr: Array<T>

  constructor(iter: Array<T>) {
    this._arr = iter.map( v => v )
  }

  valueAt(v: number) {
    return this._arr[ v % this._arr.length ]
  }
}


export class Point extends Array<number> {
  constructor(...args: number[]) {
    super(...args)
  }

  add(p: Point|number[]): Point {
    return new Point(this.x+p[0], this.y+p[1])
  }

  get x() {
    return this[0]
  }
  get y() {
    return this[1]
  }
  set x(v) {
    this[0] = v
  }
  set y(v) {
    this[1] = v
  }
}



let defaultProxy:ProxyHandler<ExtendableProxy> = {
  set: function(object: any, key, value, proxy) {
      object[key] = value;
      return true;
  }
}

export class ExtendableProxy {
  constructor(definition: ProxyHandler<any> = defaultProxy) {
      return new Proxy(this, definition);
  }
}








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
        let p = Number.parseInt(property.toString())
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
  constructor() {
    super({
      get: (target, property, reciever) => {
        let p = Number.parseInt(property.toString())
        if (isNaN(p)) {
          return target[property]
        } else {
          target.grid[property] = target.grid[property] || new SubGrid<T>()
          return target.grid[property]
        }
      }
    } as GridProxy<T>)
    this.grid = {}
  }

  forEach(callback: (value: T, x?: number, y?: number, self?: Grid<T>) => void) {
    Object.keys(this.grid).forEach( xs => {
      let x = Number.parseInt(xs)
      Object.keys(this[x].subgrid).forEach( ys => {
        let y = Number.parseInt(ys)
        callback(this[x][y], x, y, this)
      })
    })
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
      , x2 = xArr[1] || x1
      , y1 = yArr[0]
      , y2 = yArr[1] || y1

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