import { readFileSync } from "fs";
import { Grid } from "../tsTypes/Grid";

let baseInput = readFileSync('input.txt', 'utf8')
let secondInput = process.argv[2] ? readFileSync(process.argv[2], 'utf8') : false
let file = secondInput || baseInput

enum Infection {
  clean = 1,
  weak,
  dirty,
  flagged
}

let step1 = file.trim().split(/\r?\n/)
let step2 = step1.map( v => v.trim().split('').map( c => c==='.'?Infection.clean:Infection.dirty) )

export {step2 as Input, Infection}