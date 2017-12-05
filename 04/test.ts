import * as readline from 'readline'
import * as fs from 'fs'


RegExp.escape= function(s) {
  return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
}

function validatePassphrase(passphrase: string) {
  if (!passphrase.match(/^[ a-z]*$/)) return false
  if (!passphrase.match(/ /)) return false
  let words = passphrase.match(/[a-z]+/g)
  for (let word of words) {
    let reduced = words.filter(s => s === word)
    if (reduced.length > 1) return false
    return true
  }
}

let rd = readline.createInterface({
  input: fs.createReadStream('list.txt')
})

let i = 0
rd.on('line', (line) => {
  let res = validatePassphrase(line)
  i = res ? i + 1 : i
})

rd.on('close', () => console.log(i))

