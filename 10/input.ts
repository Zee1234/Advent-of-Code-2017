import * as fs from 'fs'

let input = fs.readFileSync('input.txt', 'utf8')
let step1 = input.split(',').map( v => parseInt(v) )
let step2 = input.split('').map( v => v.charCodeAt(0) )
let starter = [...new Array(256)].map( (_, i) => i )

;[17, 31, 73, 47, 23].forEach( v => step2.push(v))

console.log(step2)

export {starter as ListElements, step1 as Steps, step2 as ASCIISteps}