export type States = 'A'|'B'|'C'|'D'|'E'|'F'

export class State {
  state: States = 'A'
  pos = 0
  vals: {[id: number]: 0|1} = {}
  step = 0
  constructor() {}

  A() {
    this.step++
    if ( !this.vals[this.pos] ) {
      this.vals[this.pos] = 1
      this.pos++
      this.state = 'B'
    } else {
      this.vals[this.pos] = 0
      this.pos++
      this.state = 'F'
    }
  }

  B() {
    this.step++
    if ( !this.vals[this.pos] ) {
      this.vals[this.pos] = 0
      this.pos--
      this.state = 'B'
    } else {
      this.vals[this.pos] = 1
      this.pos--
      this.state = 'C'
    }
  }

  C() {
    this.step++
    if ( !this.vals[this.pos] ) {
      this.vals[this.pos] = 1
      this.pos--
      this.state = 'D'
    } else {
      this.vals[this.pos] = 0
      this.pos++
      this.state = 'C'
    }
  }

  D() {
    this.step++
    if ( !this.vals[this.pos] ) {
      this.vals[this.pos] = 1
      this.pos--
      this.state = 'E'
    } else {
      this.vals[this.pos] = 1
      this.pos++
      this.state = 'A'
    }
  }

  E() {
    this.step++
    if ( !this.vals[this.pos] ) {
      this.vals[this.pos] = 1
      this.pos--
      this.state = 'F'
    } else {
      this.vals[this.pos] = 0
      this.pos--
      this.state = 'D'
    }
  }

  F() {
    this.step++
    if ( !this.vals[this.pos] ) {
      this.vals[this.pos] = 1
      this.pos++
      this.state = 'A'
    } else {
      this.vals[this.pos] = 0
      this.pos--
      this.state = 'E'
    }
  }

  do() {
    //console.log(this.state, this.pos, this.vals)
    this[this.state]()
  }

  checksum() {
    let sum = 0
    for (let key of Object.keys(this.vals)) {
      if (this.vals.hasOwnProperty(key))
        if (this.vals[Number(key)])
          sum++
    }
    return sum
  }
}