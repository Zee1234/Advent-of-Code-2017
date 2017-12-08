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
  let d: number
  switch(command) {
    case 'dec' :
      d = Names[change] - delta
      Names[change] = d
      return d
    case 'inc' : 
      d = Names[change] + delta
      Names[change] = d
      return d
    default    : return 0
  }
}

let highest = 0
Instructions.forEach( v => {
  if (runCompare(v)) {
    let val = runCommand(v)
    highest = val > highest ? val : highest
  }
})


console.log(highest)