import { input } from "./input";
import { RepeatingList } from "../tsTypes/RepeatingList";
console.log(input)

let set = new RepeatingList<number>(0)

function insert(list: RepeatingList<number>, steps: number, position: number, value: number) {
  return list.insertAfter(value, position+steps-1)
}
let myInsert = insert.bind(null, set, input)

let pos = 0
for (let i = 1; i <= 50000000; i++) {
  pos = myInsert(pos, i)
  pos++
}
console.log(
  set.subList(set.indexOf(0)-2, 5)
)