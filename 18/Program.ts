import { Commands, Register, Step } from './input';
import { Queue } from '../tsTypes/Queue';

type RegComm = [Commands, string, Register]

class Program extends Queue<number> {
  private register: {[index: string]: number} = {}
  private twin: Program
  private position = 0
  public waiting = false

  private jump = ([_, r, v]: Step): number => this.get(r) > 0 ? this.get(v) : 1
  private receive = ([_, r]: Step) => {
    let p = this.pop()
    if(p!=undefined) {
      this.register[r] = p
      this.waiting = false
    }
    else {
      this.waiting = true
    }
  }
  private commands: {[index in Commands]: (v: Step) => void|number} = {
    snd: ([_, v]) => this.twin.push(this.get(v)),
    set: ([_, r, v]) => this.register[r.toString()] = this.get(v),
    add: ([_, r, v]) => this.register[r] = this.get(r) + this.get(v),
    mul: ([_, r, v]) => this.register[r] = this.get(r) * this.get(v),
    mod: ([_, r, v]) => this.register[r] = this.get(r) % this.get(v),
    rcv: this.receive,
    jgz: this.jump
  }


  constructor(public id: number, private steps: Step[]) {
    super()
    this.register.p = id
  }

  registerTwin(v: Program) { this.twin = v }

  get(v: Register) {
    return isNaN(Number(v)) ? this.register[v]||0 : Number(v)
  }
  set(r: string, v: number) {
    this.register[r] = v
  }
  step() {
    let current = this.steps[this.position]
    switch (current[0]) {
      case 'rcv':
        this.commands.rcv(current)
        if (!this.waiting) this.position++
        break;
      case 'jgz':
        this.position += this.jump(current)
        break;
      default:
        this.commands[current[0]](current)
        this.position++
        break;
    }
  }

  public pushCount = 0
  push(v: number) {
    super.push(v)
    this.pushCount++
  }


}

export {Program}