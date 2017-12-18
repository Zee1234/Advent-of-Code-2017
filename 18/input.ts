import { readFileSync } from "fs";

type Commands = 'snd'|'set'|'add'|'mul'|'mod'|'rcv'|'jgz'
type Register = string|number
type Step = [Commands, Register, Register]

let file = readFileSync('input.txt', 'utf8')
let step1 = file.split(/\r?\n/)
let steps = step1.map( comm => comm.split(' ').map( v => isNaN(parseInt(v)) ? v : parseInt(v) )) as Step[]
let lex = steps.reduce( (acc,v) => acc.concat(v), [])


export {steps, lex, Commands, Register, Step}