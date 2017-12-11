import {Input} from './input'
import {HexGrid} from '../tsTypes/HexGrid'

let Field = new HexGrid()

let maxDistance = Input.reduce( (info: {x: number, y: number, d: number}, direction) => {
  let spot = Field[direction](info)
  let distance = Field.shortestRoute({x:0,y:0}, spot)
  return {x: spot.x, y: spot.y, d: info.d<distance?distance:info.d}
}, {x:0,y:0,d:0})

console.log(maxDistance)