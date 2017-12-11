interface CoordInfo<T>{
  x: number,
  y: number,
  element?: T
}


class HexGrid<T> {
  [index: string]: any
  private container: {
    [index: number]: {[index: number]: T}
  } = {}

  northEast(x: number|CoordInfo<T>, y?: number) {
    let retX: number, retY: number
    if (typeof x === 'number') {
      retX = x+1
      retY = x%2 ? y+1 : y
      return {x: retX, y: retY, element: this.get(retX, retY)}
    } else {
      retX = x.x+1
      retY = x.x%2 ? x.y+1 : x.y
      return {x: retX, y: retY, element: this.get(retX, retY)}
    }
  }
  southEast(x: number|CoordInfo<T>, y?: number) {
    let retX: number, retY: number
    if (typeof x === 'number') {
      retX = x+1
      retY = x%2 ? y : y-1
      return {x: retX, y: retY, element: this.get(retX, retY)}
    } else {
      retX = x.x+1
      retY = x.x%2 ? x.y : x.y-1
      return {x: retX, y: retY, element: this.get(retX, retY)}
    }
  }
  northWest(x: number|CoordInfo<T>, y?: number) {
    let retX: number, retY: number
    if (typeof x === 'number') {
      retX = x-1
      retY = x%2 ? y+1 : y
      return {x: retX, y: retY, element: this.get(retX, retY)}
    } else {
      retX = x.x-1
      retY = x.x%2 ? x.y+1 : x.y
      return {x: retX, y: retY, element: this.get(retX, retY)}
    }
  }
  southWest(x: number|CoordInfo<T>, y?: number) {
    let retX: number, retY: number
    if (typeof x === 'number') {
      retX = x-1
      retY = x%2 ? y : y-1
      return {x: retX, y: retY, element: this.get(retX, retY)}
    } else {
      retX = x.x-1
      retY = x.x%2 ? x.y : x.y-1
      return {x: retX, y: retY, element: this.get(retX, retY)}
    }
  }
  north(x: number|CoordInfo<T>, y?: number) {
    if (typeof x === 'number') {
      return {x: x, y: y+1, element: this.get(x, y+1)}
    } else {
      return {x: x.x, y: x.y+1, element: this.get(x.x, x.y+1)}
    }
  }
  south(x: number|CoordInfo<T>, y?: number) {
    if (typeof x === 'number') {
      return {x: x, y: y-1, element: this.get(x, y-1)}
    } else {
      return {x: x.x, y: x.y-1, element: this.get(x.x, x.y-1)}
    }
  }

  get(x: number|CoordInfo<T>, y?: number) {
    if (typeof x === 'number') {
      this.container[x] = this.container[x] || {}
      return this.container[x][y]
    } else {
      this.container[x.x] = this.container[x.x] || {}
      return this.container[x.x][x.y]
    }
    
  }
  set(value: T, x: number|CoordInfo<T>, y?: number) {
    if (typeof x === 'number') {
      this.container[x] = this.container[x] || {}
      return this.container[x][y] = value
    } else {
      this.container[x.x] = this.container[x.x] || {}
      return this.container[x.x][x.y] = value
    }
    
  }

  shortestRoute(start: CoordInfo<T>, end: CoordInfo<T>, step: number = 0): number {
    if (start.x === end.x && start.y === end.y) return step
    let ret: CoordInfo<T>
    if      (start.x < end.x) {
      if      (start.y < end.y) ret = this.northEast(start.x, start.y)
      else if (start.y > end.y) ret = this.southEast(start.x, start.y)
      else if (!(start.x%2))    ret = this.northEast(start.x, start.y)
      else                      ret = this.southEast(start.x, start.y)
    }
    else if (start.x > end.x) {
      if      (start.y < end.y) ret = this.northWest(start.x, start.y)
      else if (start.y > end.y) ret = this.southWest(start.x, start.y)
      else if (!(start.x%2))    ret = this.northWest(start.x, start.y)
      else                      ret = this.southWest(start.x, start.y)
    }
    else if (start.y < end.y)   ret = this.north(start.x, start.y)
    else                        ret = this.south(start.x, start.y)
    step++
    return this.shortestRoute(ret, end, step)
  }
}



export {HexGrid, CoordInfo}