console.time('bruteForce')
import { input as stepSize } from "./input";
import { RepeatingList } from "../tsTypes/RepeatingList";

let currentPos = 0
  , length = 1
  , one = 0
for (let i = 1; i <= 50000000; i++) {
  currentPos = (currentPos+stepSize)%length+1
  length++
  if (currentPos===1) one = i
}
console.log(one)
console.timeEnd('bruteForce')