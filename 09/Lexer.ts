import {Input} from './input'
//let Input = ' '+'<{o"i!a,<{i<a>'

let specialCharacter = [
  '{',
  '}',
  '<',
  '>',
  '!'
]
let characters = Input.split('')
let Lexed: string[] = [], filler: string = ''

characters.forEach( char => {
  if (specialCharacter.indexOf(char) >= 0) {
    if (filler) {
      Lexed.push(filler)
      Lexed.push(char)
      filler = ''
    } else {
      Lexed.push(char)
    }
  } else {
    filler += char
  }
})

export {Lexed, specialCharacter}