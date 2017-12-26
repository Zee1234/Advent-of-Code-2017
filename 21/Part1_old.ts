import { Input, Start } from "./input";
import { Transformation } from "./Transformation";
import { Grid } from "../tsTypes/Grid";

let all = Input.map( ([i, o]) => new Transformation(i, o) )
let two: Transformation[] = []
let three: Transformation[] = []
all.forEach( v => {
  if (v.size === 2)
    two.push(v)
  else if (v.size === 3)
    three.push(v)
})

if (two.length < 24) {
  let trans = two.reduce( (acc, t) => {
    let current = t
    for(let i = 0; i < 4; i++) {
      let arr: Transformation[] = []
      arr.push(current.copy())
      arr.push(current.flipH())
      arr.push(current.flipH())
      arr.push(current.flipH().flipV())
      current = current.rotate()
      acc.push(arr)
    }
    return acc
  }, []) as Transformation[][]
  two = trans.map( v => {
    return v.filter( t => {
      for (let k of two)
        if (k.matches(t.grid))
          return false
      return true
    })
  }).reduce( (acc, v) => acc.concat(v))
}

if (three.length < 362880) {
  let trans = three.reduce( (acc, t) => {
    let current = t
    for(let i = 0; i < 4; i++) {
      let arr: Transformation[] = []
      arr.push(current.copy())
      arr.push(current.flipH())
      arr.push(current.flipH())
      current = current.rotate()
      acc.push(arr)
    }
    return acc
  }, []) as Transformation[][]
  three = trans.map( v => {
    return v.filter( t => {
      for (let k of three)
        if (k.matches(t.grid))
          return false
      return true
    })
  }).reduce( (acc, v) => acc.concat(v))
}

console.log(two.length, three.length)

function transform(start: Grid<string>, size: number, offset: {x: number, y: number}) {
  if (size === 2) {
    let pos = 0
    two.forEach( (v, i) => {if (v.matches(start)) pos = i} )
    return two[pos].createOutput(start, offset)

  } else /*if (size === 3))*/ {
    let pos = 0
    three.forEach( (v, i) => {if (v.matches(start)) pos = i} )
    return three[pos].createOutput(start, offset)
  }
}

function upScale(image: Grid<string>) {
  let nextImage: Grid<string>
  if (image.data.size % 2) {
    let arr: Grid<string>[][] = []
    for (let groupX = 0; groupX < image.data.size; groupX++) {
      arr[groupX] = []
      for (let groupY = 0; groupY < image.data.size; groupY++) {
        arr[groupX][groupY] = image.sub([groupX*2, groupX*2+1], [groupY*2, groupY*2+1])
      }
    }
    nextImage = arr.reduce( (acc, arr, x) => {
      arr.forEach( (v, y) => acc.merge(transform(v, 2, {x: x*2, y: y*2})) )
      return acc
    }, new Grid<string>() )
  } else /*if (image.data.size % 3)*/ {
    let arr: Grid<string>[][] = []
    for (let groupX = 0; groupX < image.data.size; groupX++) {
      arr[groupX] = []
      for (let groupY = 0; groupY < image.data.size; groupY++) {
        arr[groupX][groupY] = image.sub([groupX*3, groupX*3+2], [groupY*3, groupY*3+2])
      }
    }
    nextImage = arr.reduce( (acc, arr, x) => {
      arr.forEach( (v, y) => acc.merge(transform(v, 3, {x: x*3, y: y*3})) )
      return acc
    }, new Grid<string>() )
  }
  return nextImage
}

console.log(upScale(Start))