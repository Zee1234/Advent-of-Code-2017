import { readFileSync } from "fs";

let baseInput = readFileSync('input.txt', 'utf8')
let secondInput = process.argv[2]
let input = parseInt(secondInput || baseInput)

export {input}