import { Grid } from "../tsTypes/Grid";
import { Point } from "../tsTypes/Point";
import { RepeatingList } from "../tsTypes/RepeatingList";
import { Infection } from "./input";

type DirectionString = 'north'|'east'|'south'|'west'
let Direction = new RepeatingList<DirectionString>('north', 'east', 'south', 'west')


export class Sporifica extends Grid<number> {
  worker: {
    direction: number,
    location: Point
  } = {
    direction: 0,
    location: new Point(13,13)
  }

  private _dir: {[index in DirectionString]: Point} = {
    'north': new Point(0, 1),
    'south': new Point(0, -1),
    'east': new Point(1, 0),
    'west': new Point(-1, 0)
  }
  // private _dir: {[index: string]: [number, number]} = {
  //   'north': [0, 1],
  //   'south': [0, -1],
  //   'east': [1, 0],
  //   'west': [-1, 0]
  // }

  constructor(input: number[][]) {
    super()
    let size = input.length
      // , offset = Math.floor(size/2)
    input.forEach( (arr, y) => arr.forEach( (d, x) => this[x][y] = d ) )
  }

  step1() {
    let x = this.worker.location.x
      , y = this.worker.location.y
    if (this[x][y] === Infection.dirty) /*if (infected)*/ {
      this.worker.direction+=1
      this[x][y]=Infection.clean
      this.move()
      return false
    } else /*is clean*/ {
      this.worker.direction-=1
      this[x][y]=Infection.dirty
      this.move()
      return true
    }
  }

  move() {
    this.worker.location = this.worker.location.add(this._dir[Direction.valueAt(this.worker.direction)])
  }
}