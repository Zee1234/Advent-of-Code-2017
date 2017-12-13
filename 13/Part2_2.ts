import { Input } from "./input"
console.time('Part2_2')

let safe = false
  , delay = -2

finder:
while(!safe) {
  delay += 2
  for (let i = 0; i < Input.length; i++) {
    if ( !((Input[i][0]+delay)%(2*Input[i][1]-2)) ) continue finder;
  }
  safe = true
}
console.log(delay)
console.timeEnd('Part2_2')