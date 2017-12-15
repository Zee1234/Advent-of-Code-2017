console.log('Starting Async')
console.time('ASync')
import { Divisor, Factors, Start } from "./input";



let factorA = Factors.A
async function updateA(start: number) {
  let ret = start
  do {
    ret = (ret*factorA)%Divisor
  } while(ret%4)
  return ret
}
let factorB = Factors.B
async function updateB(start: number) {
  let ret = start
  do {
    ret = (ret*factorB)%Divisor
  } while(ret%8)
  return ret
}

async function compare({A, B}: {A: number, B: number}) {
  let [genA, genB] = await Promise.all([updateA(A), updateB(B)])
  let [a, b] = await Promise.all([trimAndPad(genA), trimAndPad(genB)])
  return {A: genA, B: genB, same: a===b}
}

async function trimAndPad(num: number) {
  let str = num.toString(2).slice(-16)
  while (str.length<16) str = '0'+str
  return str
}

async function run() {
  let pair = Start
  //let pair = {A:116, B:299}
    , count = 0
  for (let i = 0; i < 5000000; i++) {
    let current = await compare(pair)
    if(current.same) count++
    pair = current
  }
  return count
}

async function DOTHETHING() {
  let a = await run()
  console.log(a)
  console.timeEnd('ASync')
}

DOTHETHING()
