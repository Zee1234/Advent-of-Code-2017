import { Start, Commands, run } from "./Part1";

let set = Start.map(v=>v)
  , startString = Start.join('')
  , steps = 0
do {
  set = run(Commands, set)
  steps++
} while(startString!==set.join(''))

export {steps}