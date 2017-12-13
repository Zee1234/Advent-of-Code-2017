
import { readFileSync } from "fs";

let input = readFileSync('input.txt', 'utf8')
let Input = input.split('\r\n').map( v => v.split(': ').map( Number ))
export {Input}