import { readFileSync } from "fs";

let Input = readFileSync('input.txt', 'utf8')
let Divisor = 2147483647
let Factors = {
  A: 16807,
  B: 48271
}
let Start = {
  A: 679,
  B: 771
}


export {Divisor, Factors, Start}