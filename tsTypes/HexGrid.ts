interface coordInfo<T>{
  x: number,
  y: number,
  element?: T
}


class HexGrid<T> {
  [index: string]: any
  private container: {
    [index: number]: {[index: number]: T}
  } = {}

  northEast(x: number, y: number) {
    let retX: number, retY: number
    retX = x+1
    retY = x%2 ? y+1 : y
    return {x: retX, y: retY, element: this.get(retX, retY)}
  }
  southEast(x: number, y: number) {
    let retX: number, retY: number
    retX = x+1
    retY = x%2 ? y : y-1
    return {x: retX, y: retY, element: this.get(retX, retY)}
  }
  northWest(x: number, y: number) {
    let retX: number, retY: number
    retX = x-1
    retY = x%2 ? y+1 : y
    return {x: retX, y: retY, element: this.get(retX, retY)}
  }
  southWest(x: number, y: number) {
    let retX: number, retY: number
    retX = x-1
    retY = x%2 ? y : y-1
    return {x: retX, y: retY, element: this.get(retX, retY)}
  }
  north(x: number, y: number) {
    return {x: x, y: y+1, element: this.get(x, y+1)}
  }
  south(x: number, y: number) {
    return {x: x, y: y-1, element: this.get(x, y-1)}
  }

  get(x: number|coordInfo<T>, y: number) {
    if (typeof x === 'number') {
      this.container[x] = this.container[x] || {}
      return this.container[x][y]
    } else {
      this.container[x.x] = this.container[x.x] || {}
      return this.container[x.x][x.y]
    }
    
  }
  set(value: T, x: number|coordInfo<T>, y: number) {
    if (typeof x === 'number') {
      this.container[x] = this.container[x] || {}
      return this.container[x][y] = value
    } else {
      this.container[x.x] = this.container[x.x] || {}
      return this.container[x.x][x.y] = value
    }
    
  }

  shortestRoute(start: coordInfo<T>, end: coordInfo<T>, step: number = 0): number {
    if (start.x === end.x && start.y === end.y) return step
    let ret: coordInfo<T>
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



export {HexGrid}