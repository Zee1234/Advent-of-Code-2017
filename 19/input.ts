import { readFileSync } from "fs";

let baseInput = readFileSync('input.txt', 'utf8')
let secondInput = process.argv[2] ? readFileSync(process.argv[2], 'utf8') : false
let file = secondInput || baseInput


let step1 = file.split(/\r?\n/)
let step2 = step1.map( v => v.split('') )

export {step2 as Input}