import { readFileSync } from "fs";

let baseInput = readFileSync('input.txt', 'utf8')
let secondInput = process.argv[2] ? readFileSync(process.argv[2], 'utf8') : false
let file = secondInput || baseInput
file = file.replace(/\r/g,'')

let starter = file.match( RegExp(`Begin in state (.)\.
Perform a diagnostic checksum after ([0-9]+) steps.`))


let def = `In state (.):
  If the current value is (.):
    \- Write the value (.)\.
    \- Move one slot to the (.).*?\.
    \- Continue with state (.)\.
  If the current value is (.):
    \- Write the value (.)\.
    \- Move one slot to the (.).*?\.
    \- Continue with state (.)\.`

export type ZeroOrOneString = '0'|'1'
export interface Process {
  target: number
  direction: boolean
  newState: string
}
export interface StepDefinition {
  state: string
  '0': Process
  '1': Process
}
let steps = file.match( RegExp(def, 'g'))
let stepDefsExtra = steps.map( s => s.match(RegExp(def)) )
let stepDefs: StepDefinition[] = []
for (let step of stepDefsExtra) {
  let first: Process = {
    target: Number(step[3]),
    direction: (step[4] === 'r'),
    newState: step[5]
  }
    , second: Process = {
    target: Number(step[7]),
    direction: (step[8] === 'r'),
    newState: step[9]
  }
  let a = step[2] as ZeroOrOneString
    , b = step[6] as ZeroOrOneString
  let x = {} as StepDefinition
  x.state = step[1]
  x[a] = first
  x[b] = second
  stepDefs.push(x)
}

export {starter, stepDefs}