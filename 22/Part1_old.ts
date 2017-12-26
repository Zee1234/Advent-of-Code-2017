import { Sporifica } from "./Sporifica";
import { Input } from "./input";

let PC = new Sporifica(Input)

let t = 0
for(let i = 0; i < 10000; i++)
  if (PC.step1()) t++

console.log(t)