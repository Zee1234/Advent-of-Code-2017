import { Input, ParticleDefinition, Vector } from './input';
import { Particle } from './Particle';

let Points = Input.map( v => new Particle(v))

for (let i = 0; i < 10000; i++) {
  Points.forEach( v => v.tick() )
}

let closest = {d: 1e10000, i: -1}
Points.forEach( (p, i) => {
  let md = p.manhattanDistance()
  if (md < closest.d) {
    closest.d = md
    closest.i = i
  }
})
console.log(closest)