import { Grid } from "../tsTypes/Grid";

type Offset = {x: number, y: number}

export class Transformation {
  private rows: Grid<string>
  private output: Grid<string>
  private _size: number
  constructor(private inputString: string, private outputString: string) {
    this.rows = new Grid()
    let rowsArr = inputString.split('/').map( (v, y) => v.split('').map( (c, x) => this.rows[y][x] = c ))
    this._size = rowsArr.length

    this.output = new Grid()
    inputString.split('/').forEach( (v, y) => v.split('').forEach( (c, x) => this.output[y][x] = c ))
  }

  rotate() {
    let r = this.rows
    if (this._size === 2)
      return new Transformation(r[1][0]+r[0][0]+'/'+r[1][1]+r[0][1], this.outputString)
    else
      return (
        new Transformation(
          r[1][0]+r[0][0]+r[0][1]+'/'+
          r[2][0]+r[1][1]+r[0][2]+'/'+
          r[2][1]+r[2][2]+r[1][2]+'/',
          this.outputString
        )
      )
  }

  flipH() {
    return new Transformation(this.inputString.split('/').reverse().join('/'), this.outputString)
  }
  flipV() {
    return new Transformation(
      this.inputString
          .split('/')
          .map( v => v.split('')
                      .reverse()
                      .join('') )
          .join('/'), this.outputString
    )
  }

  get size() {
    return this._size
  }

  get grid() {
    return this.rows
  }

  matches(set: Grid<string>) {
    let matches = true
    this.rows.forEach( (v, x, y) => matches = set[x][y] === v ? matches : false )
    return matches
  }

  createOutput(set: Grid<string>, {x, y}: Offset): Grid<string> {
    if (!this.matches(set)) return null
    x *= this._size
    y *= this._size
    return this.output.offset({x, y})
  }

  copy() {
    return new Transformation(this.inputString, this.outputString)
  }
}