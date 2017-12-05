import Spreadsheet from './SpreadsheetConverter'
import { prependListener } from 'cluster';

interface divisionReturn {
  mod: number,
  int: number
}
function division(a: number, b: number): divisionReturn {
  return {
    mod: b%a,
    int: Math.floor(b/a)
  }
}

console.log(
  Spreadsheet.reduce( (previousResult, currentArray) => {
    let sort = currentArray.slice().sort( (a,b) => b-a )
    return previousResult + sort.reduce( (result, opp, index, array) => {
      if (result) return result
      for (let i = index+1; i < array.length; i+=1) {
        let div = division(array[i], opp)
        if (!div.mod) return div.int
      }
      return 0
    }, 0)
  }, 0)
)