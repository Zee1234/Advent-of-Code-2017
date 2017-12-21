import { readFileSync } from "fs";

let baseInput = readFileSync('input.txt', 'utf8')
let secondInput = process.argv[2] ? readFileSync(process.argv[2], 'utf8') : false
let file = secondInput || baseInput

interface Vector {
  x: number,
  y: number,
  z: number
}
type ParticleDefinition = {p: Vector, v: Vector, a: Vector}


let step1 = file.split(/\r?\n/)
let step2 = step1.map( v => {
  return  v.match(/p=<([\-0-9]+),([\-0-9]+),([\-0-9]+)>, v=<([\-0-9]+),([\-0-9]+),([\-0-9]+)>, a=<([\-0-9]+),([\-0-9]+),([\-0-9]+)>/)
          .filter( (_, i) => 1<=i && i<=9 )
})
let step3: ParticleDefinition[] = step2.map( v => {
  return {
    p: {
      x: parseInt(v[0]),
      y: parseInt(v[1]),
      z: parseInt(v[2])
    },
    v: {
      x: parseInt(v[3]),
      y: parseInt(v[4]),
      z: parseInt(v[5])
    },
    a: {
      x: parseInt(v[6]),
      y: parseInt(v[7]),
      z: parseInt(v[8])
    }
  }
})

export {step3 as Input, ParticleDefinition, Vector}