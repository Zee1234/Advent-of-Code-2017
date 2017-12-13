import { Input } from "./input";
import { Scanner } from "../tsTypes/Scanners";

function newNodes() {
  let nodes: Scanner[] = []
  , maxDepth = 0

  Input.forEach( ([depth, length]) => {
    nodes[depth] = new Scanner(length)
    maxDepth = depth > maxDepth ? depth : maxDepth
  })

  for( let i = 0; i < maxDepth; i++ )
    nodes[i] = nodes[i] || new Scanner()

  return nodes
}

let safe = false
  , delay = -2
  , nodes = newNodes()
while(!safe) {
  nodes.forEach ( v => v.reset() )
  delay += 2
  
  for (let i = 0; i < delay; i++){
    nodes.forEach( v => v.update() )
  }
  // let warns = nodes.reduce( (acc, scan, i) => {
  //   if (scan.collides()) acc += i*scan.length
  //   nodes.forEach( v => v.update() )
  //   return acc
  // }, 0)
  // console.log(`-------------------\nDelay: ${delay}\tScore: ${warns}\n-------------------`)
  let warns = false
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].collides()) {
      warns = true
      break;
    }
    for (let j = i+1; j < nodes.length; j++) {
      nodes[j].update()
    }
  }
  if (!(delay%1000)) console.log(delay)
  // if (warns === 0) safe = true
  if (!warns) safe = true
}

console.log(delay)