import {RepeatingList} from '../tsTypes/RepeatingList'






export function knotHash(input: string) {
  let Steps = input.split('').map( v => v.charCodeAt(0) )
    , List = new RepeatingList(...[...new Array(256)].map( (_, i) => i ))
  ;[17, 31, 73, 47, 23].forEach( v => Steps.push(v))

  let skip = 0
    , position = 0
  ;[...new Array(64)].forEach( _=> {
    Steps.forEach( size => {
      let sub = List.subList(position, size)
      let reversed = sub.reverse()
      let merged = List.mergeMaintainSize(reversed, position)
      List = merged
      position += (skip + size)
      skip++
    })
  })
  
  let Packs: RepeatingList<number>[] = []
  for (let i = 0; i < 16; i++) {
    Packs.push(List.subList(i*16, 16))
  }
  
  let preHash = Packs.map( list => {
    return (
      list.valueAt(0) ^
      list.valueAt(1) ^
      list.valueAt(2) ^
      list.valueAt(3) ^
      list.valueAt(4) ^
      list.valueAt(5) ^
      list.valueAt(6) ^
      list.valueAt(7) ^
      list.valueAt(8) ^
      list.valueAt(9) ^
      list.valueAt(10) ^
      list.valueAt(11) ^
      list.valueAt(12) ^
      list.valueAt(13) ^
      list.valueAt(14) ^
      list.valueAt(15)
    )
  })
  let preHash2 = preHash.map( v => {
    let s = v.toString(16)
    if (s.length == 2) return s
    else               return '0'+s
  })

  return preHash2.join('')
}