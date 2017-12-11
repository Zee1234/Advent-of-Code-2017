import * as fs from 'fs'

let input = fs.readFileSync('input.txt', 'utf8')
let step1 = input.split(',')
let step2 = step1.map( v => {
  switch (v) {
    case 'ne': return 'northEast'
    case 'nw': return 'northWest'
    case 'se': return 'southEast'
    case 'sw': return 'southWest'
    case 'n' : return 'north'
    case 's' : return 'south'
    default:   return 'north'
  }
})

export {step2 as Input}