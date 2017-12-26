import { Turing } from "./Turing";
import { starter, stepDefs } from "./input";

let Machine = new Turing(starter, stepDefs)

console.log(Machine.doUntilDone())