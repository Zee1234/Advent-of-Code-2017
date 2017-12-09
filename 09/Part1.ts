import {Tree, Group, totalGarbage} from './Parser'

function reducer(acc: number, child: Group): number {
  return child[0] ? child.reduce(reducer, acc + child.score) : acc + child.score
}

console.log(Tree.reduce(reducer, 0)+1)
console.log(totalGarbage.length)