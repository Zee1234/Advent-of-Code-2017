class Scanner {
  private lastPos: number = 0
  private pos: number = 0

  constructor(public length?: number) {
    if (!length) return new FakeScanner()
  }

  get position() { return this.pos }
  update() {
    let previousPos = this.lastPos
    this.lastPos = this.pos

    if (this.pos === 0 || this.pos > previousPos && this.pos < this.length-1)
      this.pos++
    else
      this.pos--
  }
  collides(spot: number = 0) {
    return this.pos === spot
  }
  reset() {
    this.lastPos = 0
    this.pos = 0
  }
}

class FakeScanner extends Scanner {

  constructor() {super(1)}
  
  get position() {return -1}
  update() {}
  collides() {return false}
}

export {Scanner}