import {Input} from './input'


let garbage = 0, inGarbage = false
for(let i = 0; i < Input.length; i++) {
  let character = Input.substring(i, i+1)
  switch (character) {
    case '<':
      if (inGarbage) garbage++
      inGarbage = true
      continue;
    case '>':
      inGarbage = false
      continue;
    case '!':
      i++
      continue;
    default:
      if (inGarbage) garbage++
      continue;
  }
}

console.log(garbage)