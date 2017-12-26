import { Input, CommandStrings, Registers, RegisterNumerals, DataPoints, CommandDefinition } from "./input";
// Input.splice(11, 0, 
//   ['set', 'd', 109890])
// Input.splice(11, 0, 
//   ['set', 'e', 109890])

let memory = [...Array(9)].map( () => 0 )
memory[RegisterNumerals.a] = 1
memory[RegisterNumerals.e] = 109700

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

function s(a: Registers) {
  return memory[RegisterNumerals[a]]
}
let step = 0
while (0 <= step && step < Input.length) {
  let stepSize = dothething(Input[step])
  step+=stepSize
  // console.log(
  //   `Step: ${step+1} | [a: ${s('a')}, b: ${s('b')}, c: ${s('c')}, d: ${s('d')}, e: ${s('e')}, f: ${s('f')}, g: ${s('g')}, h: ${s('h')}]`
  // )
}

console.log(memory[RegisterNumerals.h])