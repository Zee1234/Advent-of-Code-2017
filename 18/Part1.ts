import { steps, Commands, Register, Step } from "./input";

let register: {[index: string]: number} = {}

let get = (v:Register) => isNaN(Number(v)) ? register[v]||0 : Number(v)
let frequency: number
let playSound = (v: number) => {frequency = v}
let getSound = () => frequency
let position = 0
let jump = ([_, r, v]: Step): number => get(r) > 0 ? get(v) : 1

let commands: {[index in Commands]: (v: Step) => void|number} = {
  snd: ([_, v]) => playSound(get(v)),
  set: ([_, r, v]) => register[r] = get(v),
  add: ([_, r, v]) => register[r] = get(r) + get(v),
  mul: ([_, r, v]) => register[r] = get(r) * get(v),
  mod: ([_, r, v]) => register[r] = get(r) % get(v),
  rcv: ([_, r]) => register[r] = !get(r) ? getSound() : 0,
  jgz: jump
}

let found = 0
while (!found) {
  console.log(register, position, steps[position])
  switch (steps[position][0]) {
    case 'rcv':
      let rcv = getSound()
      if (rcv) found = rcv
      commands.rcv(steps[position])
      position++
      break;
    case 'jgz':
      position+=jump(steps[position])
      break;
    default:
      commands[steps[position][0]](steps[position])
      position++
      break;
  }
}
console.log(found)