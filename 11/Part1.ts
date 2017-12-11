import {Input} from './input'
import {HexGrid, CoordInfo} from '../tsTypes/HexGrid'

let Field = new HexGrid<any>()

let endPoint = Input.reduce( (point: CoordInfo<any>, direction) => Field[direction](point), {x:0,y:0})

console.log(Field.shortestRoute({x:0,y:0}, endPoint))