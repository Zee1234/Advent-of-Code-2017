import {Point, RepeatingList, Grid} from './Constructs'

let shiftLeft = new Point(-1, 0)
  , shiftRight = new Point(1, 0)
  , shiftUp = new Point(0, 1)
  , shiftDown = new Point(0, -1)

let List = new RepeatingList([shiftRight, shiftUp, shiftLeft, shiftDown])

let Memory = new Grid<number>()

let value = 100
let max = Math.floor(Math.sqrt(value)/2)+3
for (let x = -max; x <= max; x++) {
  for (let y = -max; y <= max; y++) {
    Memory[x][y] = 0
  }
}

Memory[0][0] = 1