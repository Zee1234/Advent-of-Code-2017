import { ParticleDefinition, Vector } from './input';

class Particle {
  v: Vector
  a: Vector
  p: Vector
  constructor(d: ParticleDefinition) {
    this.v = d.v
    this.a = d.a
    this.p = d.p
  }

  tick() {
    this.v.x += this.a.x
    this.v.y += this.a.y
    this.v.z += this.a.z
    
    this.p.x += this.v.x
    this.p.y += this.v.y
    this.p.z += this.v.z

    return this.p
  }

  manhattanDistance() {
    let a = Math.abs, p = this.p
    return a(p.x)+a(p.y)+a(p.z)
  }
}

export { Particle }