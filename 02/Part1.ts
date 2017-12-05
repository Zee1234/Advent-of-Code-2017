import Spreadsheet from './SpreadsheetConverter'

console.log(
  Spreadsheet.reduce( (previousResult, currentArray) => {
    let sort = currentArray.slice().sort( (a,b) => a-b )
    return previousResult - sort.slice(0,1)[0] + sort.slice(-1)[0]
  }, 0)
)