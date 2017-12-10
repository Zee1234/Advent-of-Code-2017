import {ListElements, Steps} from './input'
import {RepeatingList} from '../tsTypes/RepeatingList'

let List = new RepeatingList(...ListElements)

console.log(List.subList(5,5))

let skip = 0
  , position = 0
Steps.forEach( size => {
  let sub = List.subList(position, size)
  let reversed = sub.reverse()
  let merged = List.mergeMaintainSize(reversed, position)
  List = merged
  position += (skip + size)
  skip++
})

console.log(List.valueAt(0)*List.valueAt(1))