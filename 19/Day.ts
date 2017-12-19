import { Grid } from "../tsTypes/Grid";
import { Input } from "./input";

let map = new Grid<string>()

Input.forEach( (arr, y) => arr.forEach( (val, x) => map[x][y] = val ) )
let start = Input[0].indexOf('|')

let letters: string[] = []

type Point = {x: number, y: number}
type Direction = 'North'|'South'|'East'|'West';


let directionVectors = {
  'North': {x: 0, y: -1},
  'South': {x: 0, y: 1},
  'East': {x: 1, y: 0},
  'West': {x: -1, y: 0},
}

let position: Point = {x: 131, y: 0}

function move({x, y}: Point, d: Direction) { return {x: x+directionVectors[d].x, y: y+directionVectors[d].y} }
function moveReverse({x, y}: Point, d: Direction) { return {x: x-directionVectors[d].x, y: y-directionVectors[d].y} }
function samePoint(p1: Point, p2: Point) { return p1.x===p2.x&&p1.y===p2.y }


let Characters = [...Array(26)].map( (_,i) => String.fromCharCode(i+65) )
function path({x, y}: Point, d: Direction): any {
  let newDirection = d
  function forNeighbors(value: string, nx: number, ny: number) {
    if (value !== ' ')
      if (!samePoint(moveReverse({x, y}, d), {x: nx, y: ny}))
        if (d==='North' || d==='South') {
          newDirection = samePoint(move({x,y}, 'East'), {x: nx, y: ny}) ? 'East' : 'West'
        } else {
          newDirection = samePoint(move({x,y}, 'North'), {x: nx, y: ny}) ? 'North' : 'South'
        }
  }

  let char = map[x][y]
  switch (char) {
    case ' ':
      return false
    case '+':
      let next: Point
      map.forCardinalNeighbors(x, y, forNeighbors)
      return {p: move({x, y}, newDirection), d: newDirection}
    default:
      if (Characters.indexOf(char) > -1) letters.push(char)
      return {p: move({x, y}, newDirection), d: newDirection}
  }
}

let next: {p: Point, d: Direction} = {p: position, d: 'South'}
let i = -1 // Start negative because the loop goes a little long
while(next) {
  next = path(next.p, next.d)
  i++
}

console.log('Part 1:', letters.join(''))
console.log('Part 2:', i)

