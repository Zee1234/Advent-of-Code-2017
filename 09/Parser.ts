import {Lexed, specialCharacter} from './Lexer'

class Group extends Array<Group> {
  constructor(public score: number, public _parent?: Group) {super()}
  identify = () => Group
  parent = () => this._parent
  add = (child: Group) => this.push(child)
}

class Garbage {
  identify = () => Garbage
}

let currentGroup: Group = new Group(1), baseGroup = currentGroup
let inGarbage = false, skip1 = false


let totalGarbage = ''
for (let i = 1; i < Lexed.length; i++) {
  let characterSet = Lexed[i]
  if (skip1) {
    characterSet = characterSet.substring(1)
    skip1 = false
  }
  //console.log(inGarbage, characterSet,totalGarbage)
  if (Lexed[i].length > 1) {
    if (inGarbage) totalGarbage+=characterSet
    continue;
  }
  switch (characterSet) {
    case '{':
      if (inGarbage) {totalGarbage+=characterSet; continue;}
      let nextGroup = new Group(currentGroup.score+1, currentGroup)
      currentGroup.add(nextGroup)
      currentGroup = nextGroup
      continue;
    case '}':
      if (inGarbage) {totalGarbage+=characterSet; continue;}
      currentGroup = currentGroup.parent()
      continue;
    case '<':
      if (inGarbage) {totalGarbage+=characterSet; continue;}
      inGarbage = true
      continue;
    case '>':
      inGarbage = false
      continue;
    case '!':
      skip1 = true
      continue;
  
    default:
      totalGarbage += characterSet
      continue;
  }
}

export {baseGroup as Tree, Group, Garbage, totalGarbage}