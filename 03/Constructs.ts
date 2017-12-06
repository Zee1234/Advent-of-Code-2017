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
    [key: number]: T
  }

  constructor() {
    super({
      get: (target, property, reciever) => {
        return target[property]
      },
      set: (target, property, value, reciever) => {
        try {
          target[property] = value
        } catch(e) {
          return e
        }
        return true
      },
    } as SubGridProxy<T>)
  }
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
        target.grid[property] = target.grid[property] || new SubGrid<T>()
        return target.grid[property]
      }
    } as GridProxy<T>)
    this.grid = {}
  }
}