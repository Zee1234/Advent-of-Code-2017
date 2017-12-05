import * as fs from 'fs'

function sumMatch(str: string) {
  let list = str.split('').map( s => Number.parseInt(s))
  let sum = 0
  let length = list.length, dist = list.length/2
  for (let index in list) {
    let place = Number.parseInt(index)
      , pos = ((place + dist) % length)
    pos = pos >= 0 ? pos : length - 1
    let digit = list[place]
    let other = list[pos]
    sum += digit === other ? digit : 0
  }
  return sum
}

console.log(sumMatch(fs.readFileSync('list.txt','utf8').replace(/[^0-9]/g,'')))