import { Trans2, Trans3 } from "./Trans";
import { Input, StartString } from "./input";

let all = Input.map( ([start, end]) => {
  if (start.length === 5)
    return new Trans2(start, end)
  else
    return new Trans3(start, end)
})
let two = all.filter( v => v.length === 2 ) as Trans2[]
let three = all.filter( v => v.length === 3 ) as Trans3[]

function splitImage(image: string) {
  let rows = image.split('/')
  let length = rows[0].length
  if (!(length%2)) {
    let tmp = rows.map( v => v.match(/./g) ) as string[][]
    var subImages: string[][] = []
    for (let i = 0; i < length; i+=2) subImages.push([])
    for (let y = 0; y < length/2; y++)
      for (let x = 0; x < length/2; x++)
        subImages[y][x] = tmp[y*2][x*2]+tmp[y*2][x*2+1]+'/'+tmp[y*2+1][x*2]+tmp[y*2+1][x*2+1]
  } else /*if (length%3)*/ {
    let tmp = rows.map( v => v.match(/./g) ) as string[][]
    var subImages: string[][] = []
    for (let i = 0; i < length; i+=3) subImages.push([])
    for (let y = 0; y < length/3; y++)
      for (let x = 0; x < length/3; x++)
        subImages[y][x] = (
          tmp[y*3][x*3]+tmp[y*3][x*3+1]+tmp[y*3][x*3+2]+'/'+
          tmp[y*3+1][x*3]+tmp[y*3+1][x*3+1]+tmp[y*3+1][x*3+2]+'/'+
          tmp[y*3+2][x*3]+tmp[y*3+2][x*3+1]+tmp[y*3+2][x*3+2]
        )
  }
  return subImages
}

function mergeSubimages(subImages: string[][]) {
  let derpRows = subImages.map( v1 => v1.map( v2 => v2.split('/') ) )
  let superRows = derpRows[0].length
  let rowCount = superRows*derpRows[0][0].length
  let rows: string[] = new Array(rowCount)
  derpRows.forEach( (superRow) => {
    let partialRows: string[] = []
    superRow.forEach( (columns) => {
      columns.forEach( (part, i) => {
        partialRows[i] = partialRows[i] ? partialRows[i]+part : part
      })
    })
    partialRows.forEach( row => rows.push(row) )
  })
  return rows.filter(v=>v).join('/')
}

function upscale(img: string) {
  let finalMatch: string
  if (img.length === 5) {
    let matches = two.map( v => v.upgrade(img) ).filter( v => v )
    console.log(matches)
    for (let match of matches) {
      if (match[1]) finalMatch = match[0]
    }
    finalMatch = matches[0][0]
  } else if (img.length === 11) {
    let matches = three.map( v => v.upgrade(img) ).filter( v => v )
    for (let match of matches) {
      if (match[1]) finalMatch = match[0]
    }
    finalMatch = matches[0][0]
  } else throw new Error('Subimage is of impossible length!\n'+img)
  return finalMatch
}

function processReplacements(subImages: string[][]) {
  return subImages.map( arr => arr.map( img => upscale(img) ) )
}

export function step(image: string) {
  return mergeSubimages(processReplacements(splitImage(image)))
}

let step1 = step(StartString)
  , step2 = step(step1)
  , step3 = step(step2)
  , step4 = step(step3)
  , step5 = step(step4)

console.log(StartString.match(/#/g).length)
console.log(step1.match(/#/g).length)
console.log(step2.match(/#/g).length)
console.log(step3.match(/#/g).length)
console.log(step4.match(/#/g).length)
console.log(step5.match(/#/g).length)