import { Input } from "./input";
// let Input = 'flqrgnkx'
import { Steps } from "../10/input";
import { knotHash } from "../tsTypes/KnotHash";

function postfix(num: number) { return Input+'-'+num }
function pad4(str: string) {
  switch (str.length) {
    case 0:  return '0000'
    case 1:  return '000'+str
    case 2:  return '00'+str
    case 3:  return '0'+str
    default: return str
  }
}


let keys = [...new Array(128)].map( (_, i) => postfix(i))

let hashes = keys.map( v => knotHash(v) )
let hashStringArrays = hashes.map( v => v.split('') )
let hashBinaryArrays = hashStringArrays.map( arr => arr.map( v => pad4(parseInt(v, 16).toString(2)) ) )
let rowArrays = hashBinaryArrays.map( row => row.map( section => section.split('') ).reduce( (acc, set) => acc.concat(set), []) )
let count = rowArrays.reduce( (count, row) => count + row.reduce( (acc, char) => char==='1' ? acc+1 : acc,0),0)
// let ints = hashes.map( v => parseInt(v, 16) )
// let byteStrings = ints.map( v => v.toString(2) )
// let byteArrays = byteStrings.map( v => v.split('').map(parseInt) )
// let count = byteArrays.reduce( (acc, arr) => {
//   let count = 0
//   arr.forEach( v=> {if(v) {count += 1}} )
//   return acc + count
// }, 0)
console.log(count)

export {rowArrays}