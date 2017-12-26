import { StepDefinition, Process } from './input'

export class Turing {
  pos = 0
  vals: {[id: number]: number} = {}
  step = 0
  states: {[index: string]: Process[]} = {}
  currentState: string
  maxSteps: number

  constructor([_, startState, steps]: string[], stepDef: StepDefinition[]) {
    this.currentState = startState
    this.maxSteps = Number(steps)

    stepDef.forEach( def => {
      this.states[def.state] = []
      this.states[def.state].push(def['0'])
      this.states[def.state].push(def['1'])
    })
  }

  do() {
    this.step++
    let state = this.states[this.currentState]
    if ( this.vals[this.pos] ) {
      this.vals[this.pos] = state[1].target
      state[1].direction ? this.pos++ : this.pos--
      this.currentState = state[1].newState
    } else {
      this.vals[this.pos] = state[0].target
      state[0].direction ? this.pos++ : this.pos--
      this.currentState = state[0].newState
    }
  }

  doUntilDone() {
    while (this.step < this.maxSteps) this.do()
    return this.checksum()
  }

  checksum() {
    let sum = 0
    for (let key of Object.keys(this.vals))
      if (this.vals.hasOwnProperty(key))
        if (this.vals[Number(key)])
          sum++
    return sum
  }
}