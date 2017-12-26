import { State, States } from "./parsedInput";

let X = new State()
while (X.step < 12425180) {
  X.do()
}
console.log(X.vals)
console.log(X.checksum())