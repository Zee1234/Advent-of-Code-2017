import { readFileSync } from "fs";

let input = readFileSync('input.txt', 'utf8')
let step1 = input.split(',')

interface NumSwap {
  type: 'numSwap',
  pos1: number,
  pos2: number
}
interface NameSwap {
  type: 'nameSwap',
  name1: string,
  name2: string
}
interface Shift {
  type: 'shift',
  pos: number
}
type SwapTypes = NumSwap | NameSwap | Shift
let step2: SwapTypes[] = step1.map( v => {
  let numSwap = /x([0-9]+)\/([0-9]+)/
    , nameSwap = /p([a-p])\/([a-p])/
    , shift = /s([0-9]+)/
  let match
  switch (true) {
    case numSwap.test(v):
      match = v.match(numSwap)
      return { type: 'numSwap', pos1: parseInt(match[1]), pos2: parseInt(match[2]) } as NumSwap
    case nameSwap.test(v):
      match = v.match(nameSwap)
      return { type: 'nameSwap', name1: match[1], name2: match[2] } as NameSwap
    case shift.test(v):
      match = v.match(shift)
      return { type: 'shift', pos: parseInt(match[1]) } as Shift
  }
})
let step3 = step2.filter( v => v )

let Start = [...Array(16)].map( (_,i) => String.fromCharCode(97+i) )

export { step3 as Input, Start, NumSwap, NameSwap, Shift, SwapTypes }