import { InputArray } from "./input";

function largest(...args: number[]): number {
  let large = args[0]
  for (let v of args) 
    if (v > large) large = v
  return large
}

function copy<T>(a: T[]) {
  return a.map(v=>v)
}
function copyExcept<T>(a: T[], index: number) {
  let n = copy(a)
  n.splice(index, 1)
  return n
}
function add<T>(a: T[], v: T) {
  let n = copy(a)
  n.push(v)
  return n
}
function flatten(arr: any[], acc: any[]) {

}

function route(pieces: number[][], chain: number[][] = []): number[][][] {
  let pins = chain.length ? chain[chain.length-1][1] : 0
  let nextOptions = pieces.map( (v, i) => [i, v] as [number, number[]])
                          .filter( v => v[1][0]===pins || v[1][1]===pins)
  if (nextOptions.length) {
    return nextOptions.map( v => v[1][0]===pins ? 
      route(copyExcept(pieces, v[0]), add(chain, v[1])) :
      route(copyExcept(pieces, v[0]), add(chain, [v[1][1], v[1][0]]))
    ).reduce( (acc, vars) => {
      vars.forEach( v => acc.push(v) )
      return acc
    })
  } else {
    return [chain]
  }
}

let res = route(InputArray).filter( v => v.length )
console.log('Part 1', 
  res .map( chain => chain.reduce( (acc, p) => acc+p[0]+p[1], 0 ) )
      .sort( (a, b) => b-a )[0]
)
console.log('Part 2',
  res .sort( (a, b) => b.length - a.length )
      .filter( (v, i, arr) => v.length === arr[0].length )
      .map( chain => chain.reduce( (acc, p) => acc+p[0]+p[1], 0 ) )
      .sort( (a, b) => b-a )[0]
)

