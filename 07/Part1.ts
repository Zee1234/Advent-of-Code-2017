import * as fs from 'fs'
import {TreePreDef, Tree} from './Tree'
let input = fs.readFileSync('input.txt', 'utf8')
let inputArray = input.split('\r\n')
let middleStep = inputArray.map( (definition): TreePreDef => {
  let match = definition.match(/^([a-z]+) \(([0-9]+)\).*? ?([a-z, ]+)?$/)
  let name = match[1]
    , weight = parseInt(match[2])
    , children = match[3] ? match[3].split(', ') : undefined
  return {name, weight, children}
})


let Stack = new Tree()
middleStep.forEach( definition => {
  Stack.add(definition)
})

let Top = Stack.findTop()
console.log(Top)

export {Stack, Top}