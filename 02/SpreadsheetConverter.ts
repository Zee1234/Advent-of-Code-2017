import * as fs from 'fs'
let file = 'input.txt'

let contents = fs.readFileSync(file, 'utf8')

let Spreadsheet = contents.split('\n').map( a => a.split('\t').map( b => Number.parseInt(b) ) )
export default Spreadsheet