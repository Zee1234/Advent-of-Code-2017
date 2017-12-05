import * as fs from 'fs'

function sumMatch(str: string) {
  let list = str.split('').map( s => Number.parseInt(s))
  let sum = 0
  for (let index in list) {
    let place = Number.parseInt(index)
    let digit = list[place]
    let other = place === list.length-1 ? list[0] : list[place+1]
    sum += digit === other ? digit : 0
  }
  return sum
}

console.log(sumMatch(fs.readFileSync('list.txt','utf8').replace(/[^0-9]/g,'')))