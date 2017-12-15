console.log('Starting Sync')
console.time('Sync')
import { Divisor, Factors, Start } from "./input";


let current = Start
  , count = 0
for (let x = 0; x < 5000000; x++) {
  do current.A = (Factors.A*current.A)%Divisor
  while (current.A % 4 !== 0)
  do current.B = (Factors.B*current.B)%Divisor
  while (current.B % 8 !== 0)

  let a = current.A.toString(2).slice(-16)
    , b = current.B.toString(2).slice(-16)
  if (a === b) count++
}
console.log(count)
console.timeEnd('Sync')