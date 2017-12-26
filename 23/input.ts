import { readFileSync } from "fs";

let baseInput = readFileSync('input.txt', 'utf8')
let secondInput = process.argv[2] ? readFileSync(process.argv[2], 'utf8') : false
let file = secondInput || baseInput

type CommandStrings = 'set'|'sub'|'mul'|'jnz'
type Registers = 'a'|'b'|'c'|'d'|'e'|'f'|'g'|'h'
enum RegisterNumerals {
  a,
  b,
  c,
  d,
  e,
  f,
  g,
  h
}
type DataPoints = Registers|number
type CommandDefinition = [CommandStrings, DataPoints, DataPoints]

let step1 = file.split(/\r?\n/)
let step2 = step1.map( v => v.split(' ') )



let Input: CommandDefinition[] = step2.map( def => {
  return [
    def[0],
    isNaN(parseInt(def[1])) ? def[1] : parseInt(def[1]),
    isNaN(parseInt(def[2])) ? def[2] : parseInt(def[2])
  ] as CommandDefinition
})

export {Input, CommandStrings, Registers, RegisterNumerals, DataPoints, CommandDefinition}
