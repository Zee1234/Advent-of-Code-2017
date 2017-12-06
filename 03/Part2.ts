import {Point, RepeatingList, Grid} from './Constructs'
import * as util from 'util'

let shiftLeft = new Point(-1, 0)
  , shiftRight = new Point(1, 0)
  , shiftUp = new Point(0, 1)
  , shiftDown = new Point(0, -1)

let Shift = new RepeatingList(shiftRight, shiftUp, shiftLeft, shiftDown)

let Memory = new Grid<number>()

let limit = isNaN(Number.parseInt(process.argv[2])) ? 361527 : Number.parseInt(process.argv[2])
let max = Math.ceil(Math.sqrt(limit)/2)+2
for (let x = -max; x <= max; x++) {
  for (let y = -max; y <= max; y++) {
    Memory[x][y] = 0
  }
}
Memory[0][0] = 1

/**
 * 1>1^
 * 2<2v
 * 3>3^
 * 4<4v
 */
function populate({step=0, stepSize=1, point=new Point(0,0), cell=2}: 
                  {step?: number, stepSize?: number, point?: Point, cell?: number}):
                  {sum: number, point: Point, cell: number} {
  for(let i = 1; i <= stepSize; i++) {
    point = point.add(Shift.valueAt(step))
    let sub = Memory.sub([point.x-1, point.x+1], [point.y-1, point.y+1])
    let sum = sub.reduce( (acc, v) => {
      return acc + v
    }, 0)
    Memory[point.x][point.y] = sum
    if (sum >= limit) return { sum, point, cell }
    cell += 1
  }
  stepSize += step%2===0 ? 0 : 1
  step += 1
  return populate({step, stepSize, point, cell})
}

console.log(populate({}))