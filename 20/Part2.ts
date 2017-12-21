import { Input, ParticleDefinition, Vector } from './input';
import { Particle } from './Particle';

let Points = Input.map( v => new Particle(v))

let collisions: {
  [x: number]: {
    [y: number]: {
      [z: number]: number[]
    }
  }
} = {}

for (let i = 0; i < 1000; i++) {
  Points.forEach( v => v.tick() )
  Points.forEach( (v, id) => {
    let p = v.p
    collisions[p.x] = collisions[p.x] || {}
    collisions[p.x][p.y] = collisions[p.x][p.y] || {}
    if (collisions[p.x][p.y][p.z])
      collisions[p.x][p.y][p.z].push(id)
    else
      collisions[p.x][p.y][p.z] = [id]
  })
  for (let x in collisions)
    for (let y in collisions[x])
      for (let z in collisions[x][y])
        if (collisions[x][y][z].length > 1)
          collisions[x][y][z].forEach( id => Points[id] = undefined)
  Points = Points.filter( v => !!v )
  collisions = {}
  console.log(i)
}

// let closest = {d: 1e10000, i: -1}
// Points.forEach( (p, i) => {
//   let md = p.manhattanDistance()
//   if (md < closest.d) {
//     closest.d = md
//     closest.i = i
//   }
// })
// console.log(closest)
console.log(Points.length)