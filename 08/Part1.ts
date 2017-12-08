import {Instruction, Instructions, Names} from './parse'

function runCompare({target, comparison, value}: Instruction): boolean {
  switch (comparison) {
    case  '>' : return Names[target]  > value
    case  '<' : return Names[target]  < value
    case '>=' : return Names[target] >= value
    case '<=' : return Names[target] <= value
    case '==' : return Names[target] == value
    case '!=' : return Names[target] != value
    default   : return false
  }
}

function runCommand({change, command, delta}: Instruction) {
  switch(command) {
    case 'dec' : return (Names[change] -= delta) || true
    case 'inc' : return (Names[change] += delta) || true
    default    : return false
  }
}
Names
Instructions.forEach( v => {
  runCompare(v) && runCommand(v)
})

let next = Object.keys(Names).map( name => ({name, value: Names[name]}))
next.sort( (a, b) => b.value - a.value)
console.log(next[0])