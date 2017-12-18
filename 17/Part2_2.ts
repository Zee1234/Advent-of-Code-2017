console.time('bruteForce')
import { input as stepSize } from "./input";

let currentPos = 0
  , one = 0
for (let i = 1; i <= 50000000; i++) {
  currentPos = (currentPos+stepSize)%i+1
  if (currentPos===1) one = i
}
console.log(one)
console.timeEnd('bruteForce')