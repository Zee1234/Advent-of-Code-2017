import { Input, CommandStrings, Registers, RegisterNumerals, DataPoints, CommandDefinition } from "./input";

let memory = [...Array(9)].map( () => 0 )

function get(value: DataPoints) {
  if (typeof(value) === 'string')
    return memory[RegisterNumerals[value]]
  else
    return value
}
function set(reg: Registers, value: number) {
  memory[RegisterNumerals[reg]] = value
}
let mulCount = 0
function dothething([comm, a, b]: CommandDefinition) {
  switch (comm) {
    case 'set':
      set(a as Registers, get(b))
      return 1
    case 'sub':
      set(a as Registers, get(a)-get(b))
      return 1
    case 'mul':
      set(a as Registers, get(a)*get(b))
      mulCount++
      return 1
    case 'jnz':
      return get(a) ? get(b) : 1
  }
}


let step = 0
while (0 <= step && step < Input.length) {
  let stepSize = dothething(Input[step])
  step+=stepSize
}

console.log(mulCount)