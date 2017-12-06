let cell = 361527 // cell position

function run(cell: number) {
  let boxSize = (
    Math.floor(Math.sqrt(cell)) === Math.sqrt(cell) && Math.sqrt(cell)%2===1 ?
    Math.sqrt(cell) :
    Math.floor(Math.sqrt(cell)) % 2 === 0 ? 
    Math.floor(Math.sqrt(cell))/2 : 
    (Math.floor(Math.sqrt(cell))+1)/2
  )
  let a = [ 
    [[0, 0]], 
    new Array(2*boxSize+1-1).fill([-1, 0]), 
    new Array(2*boxSize+1-1).fill([0, 1]), 
    new Array(2*boxSize+1-1).fill([1, 0]), 
    new Array(2*boxSize+1-2).fill([0, -1])
  ]
    .reduce(( (p, c) => p.concat(c) ), [])
    .reduce(( (p, c, index) => (2*boxSize+1)*(2*boxSize+1)-index>=cell && [p[0]+c[0], p[1]+c[1]] || p ), [boxSize, -boxSize])
    .reduce(( (p:any, c:any) => [p[0] + Math.abs(c)] ), [0])
    .forEach( console.log.bind(console) )
}

// for(let i = 2; i < 100; i++) {
//   console.log(i)
//   run(i)
// }
run(cell)
for (let i = 1; i < 25; i++) {
  console.log('-----------------')
  console.log(i)
  console.log(run(i))
}