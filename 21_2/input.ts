import { readFileSync } from "fs";
import { Grid } from "../tsTypes/Grid";

let baseInput = readFileSync('input.txt', 'utf8')
let secondInput = process.argv[2] ? readFileSync(process.argv[2], 'utf8') : false
let file = secondInput || baseInput

let step1 = file.trim().split(/\r?\n/)
let step2 = step1.map( s => s.split(' => '))

let StartString = `
.#.
..#
###`.trim().replace(/\r?\n/g,'/')
let Start = new Grid<string>()
Start.data.size = 3
StartString.split(/\r?\n/).forEach( (str, y) => str.split('').forEach( (chr, x) => Start[y][x] = chr ))

export {step2 as Input, Start, StartString}