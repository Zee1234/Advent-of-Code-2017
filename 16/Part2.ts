import { Start, Commands, run } from "./Part1";
import { steps } from "./CycleFinder";

let set = Start.map(v=>v)
for (let i = 0; i < (1000000000%steps); i++) {
  set = run(Commands, set)
}
console.log(set.join(''))