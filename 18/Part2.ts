import { steps, Commands, Register, Step } from "./input";
import { Program } from "./Program";

let p0 = new Program(0, steps)
  , p1 = new Program(1, steps)

p0.registerTwin(p1)
p1.registerTwin(p0)

while (!p0.waiting || !p1.waiting) {
  p0.step()
  p1.step()
}

console.log(p0.pushCount)