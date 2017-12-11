import {Input} from './input'
import {HexGrid} from '../tsTypes/HexGrid'

let Field = new HexGrid()
console.log(Field.north)

let maxDistance = Input.reduce( ({x, y, d}: {x: number, y: number, d: number}, direction) => {
  let spot = Field[direction](x,y)
  let distance = Field.shortestRoute({x:0,y:0}, spot)
  return {x: spot.x, y: spot.y, d: d<distance?distance:d}
}, {x:0,y:0,d:0})

console.log(maxDistance)