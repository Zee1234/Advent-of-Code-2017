import { Divisor, Factors } from "./input";

let Start = {A: 116, B: 299}

let count = 0
let current = {
  A: Start.A,
  B: Start.B
}
for (let x = 0; x < 40000; x++) {
  current.A = (Factors.A*current.A)%Divisor
  current.B = (Factors.B*current.B)%Divisor

  let a = current.A.toString(2).slice(-16)
    , b = current.B.toString(2).slice(-16)
  if (a === b) count++
}

console.log(count)