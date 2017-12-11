import {Input} from './input'
import {HexGrid} from '../tsTypes/HexGrid'

let Field = new HexGrid()
console.log(Field.north)

let endPoint = Input.reduce( ({x, y}: {x: number, y: number}, direction) => {
  console.log(direction)
  let ret = Field[direction](x,y)
  console.log(x, y, direction, ret.x, ret.y)
  return {x: ret.x, y: ret.y}
}, {x:0,y:0})

console.log(Field.shortestRoute({x:0,y:0}, endPoint))