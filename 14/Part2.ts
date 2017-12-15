import { Input } from "./input";
import { rowArrays } from "./Part1";
import { Grid } from "../tsTypes/Grid";

let disk = new Grid<string>()
rowArrays.forEach( (row, x) => {
  row.forEach( (value, y) => {
    disk[x][y] = value
  })
})
let checked:{[index: number]: {[index: number]: boolean}} = {}
  , zones = 0
function check(depth: number, value: string, x: number, y: number, self: Grid<string>) {
  if (checked[x] && checked[x][y]) return;
  checked[x] = checked[x] || {}
  checked[x][y] = true
  if (value === '1') {
    if (depth === 0) zones++
    self.forCardinalNeighbors(x, y, check.bind(null, depth+1))
  }
}

disk.forEach(check.bind(null, 0))
console.log(zones)