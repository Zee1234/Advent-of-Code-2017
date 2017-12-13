import { Input } from "./input";
import { Scanner } from "../tsTypes/Scanners";

let nodes: Scanner[] = []
  , maxDepth = 0

Input.forEach( ([depth, length]) => {
  nodes[depth] = new Scanner(length)
  maxDepth = depth > maxDepth ? depth : maxDepth
})

for( let i = 0; i < maxDepth; i++ )
  nodes[i] = nodes[i] || new Scanner()

let warns = nodes.reduce( (acc, scan, i) => {
  console.log(scan.collides()?'c':'n', i+'\t', scan)
  if (scan.collides()) acc += i*scan.length
  nodes.forEach( v => v.update() )
  return acc
}, 0)

console.log(warns)