import {Stack, Top} from './Part1'
import {TreeMember} from './Tree'

Stack.getRandom().getTotalWeight()

function findOddOneOut(node: TreeMember): TreeMember {
  let oddOne: TreeMember, oddWeight: number
  let children = node.weightOfChildren()
  children = children.sort( (a,b) => a.weight - b.weight)
  let last = children.length - 1
  if (children[0].weight === children[last].weight) {
    return node
  } else if (children[0].weight === children[1].weight) {
    return findOddOneOut(children[last].child)
  } else {
    return findOddOneOut(children[0].child)
  }
}

let oddOne = findOddOneOut(Top)

console.log(oddOne.getParent().weightOfChildren())