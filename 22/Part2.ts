import { Input, Infection } from "./input";
import { RepeatingList } from "../tsTypes/RepeatingList";

let grid: {[index: number]: {[index: number]: Infection}} = {}
Input.forEach( (arr, row) => arr.forEach( (c, column) => {
  grid[row] = grid[row] || {}
  grid[row][column] = c
} ) )

let row = 12, column = 12
let direction = 0

let infections = 0
for(let i = 0;  i < 10000000; i++) {
  grid[row] = grid[row] ? grid[row] : {}
  grid[row][column] = grid[row][column] ? grid[row][column] : Infection.clean


  if (grid[row][column] === Infection.dirty) {
    grid[row][column] = Infection.flagged
    direction++
  } else if (grid[row][column] === Infection.clean) {
    grid[row][column] = Infection.weak
    direction--
  } else if (grid[row][column] === Infection.weak) {
    grid[row][column] = Infection.dirty
    direction+=0
    infections++
  } else if (grid[row][column] === Infection.flagged) {
    grid[row][column] = Infection.clean
    direction-=2
    if (direction === -2) direction = 2
  } else { throw new Error(grid[row][column].toString())}
  direction = direction===-1 ? 3 : direction===4 ? 0 : direction

  switch (direction) {
    case 0: row--; break;
    case 1: column++; break;
    case 2: row++; break;
    case 3: column--; break;
  }
}

console.log(infections)