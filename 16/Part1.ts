import { Input, Start, NumSwap, NameSwap, Shift, SwapTypes } from "./input";

let set = Start.map(v=>v)

interface Commands {
  [index: string]: (SwapTypes: SwapTypes) => void
}

let commands: any  = {
  nameSwap: ({name1, name2}: NameSwap, set: string[]) => {
    let one = set.indexOf(name1)
      , two = set.indexOf(name2)
    set[two] = name1
    set[one] = name2
    return set
  },
  numSwap: ({pos1, pos2}: NumSwap, set: string[]) => {
    let one = set[pos1]
      , two = set[pos2]
    set[pos1] = two
    set[pos2] = one
    return set
  },
  shift: ({pos}: Shift, set: string[]) => {
    let start = set.slice(0,-pos)
      , end = set.slice(-pos)
    set = end.concat(start)
    return set
  }
}

function run(CommandList: SwapTypes[], set: string[]) {
  let clone = set.map(v=>v)
  CommandList.forEach( v => {
    clone = commands[v.type](v, clone)
  })
  return clone
}

let output = run(Input, set)

console.log(output.join(''))

export {Start, output as End, run, Input as Commands}