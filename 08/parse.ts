import * as fs from 'fs'
let input = fs.readFileSync('input.txt', 'utf8')
let step1 = input.split('\n')
let step2 = step1.map( (v) => v.match( /([a-z]+) (dec|inc) ([0-9\-]+) if ([a-z]+) ([<>=!]+) ([0-9\-]+)/ ))
let names: {[key: string]: number} = {}
let step3 = step2.forEach( ([_1, target, command, delta, compareTo, compareType, compareValue]) => {
  names[target] = 0
})

interface Instruction {
  change: string,
  command: string,
  delta: number,
  target: string,
  comparison: string,
  value: number
}
let step4: Instruction[] = step2.map( ([_1, change, command, delta, target, comparison, compareValue]) => {
  return {
    change, target, command, comparison,
    delta: parseInt(delta),
    value: parseInt(compareValue)
  }
})

export {Instruction, step4 as Instructions, names as Names}