let twoRegEx = (function(...r: string[]) {
  return RegExp(`
      ${r[1]}${r[2]}$/
      ${r[3]}${r[4]}$
    `.replace(/( |\r|\n)/g,'').replace(/\./g,'\\.'))
}).bind(null, '')

export class Trans2 {
  _in: string[] = []
  match: RegExp
  versions: {
    [index: string]: RegExp
  } = {}
  length = 2
  constructor(private input: string, private output: string) {
    let [_, a, b, c, d] = input.match(/(.)(.)\/(.)(.)/)
    this._in.push(_, a, b, c, d)
    let r = this._in
    this.match = twoRegEx(a,b,c,d)
    this.versions.rotation1 = twoRegEx(c,a,d,b)
    this.versions.rotation2 = twoRegEx(d,c,b,a)
    this.versions.rotation3 = twoRegEx(b,d,a,c)
    this.versions.r0flip1 = twoRegEx(b,a,d,c)
    this.versions.r0flip2 = twoRegEx(c,d,a,b)
    this.versions.r1flip1 = twoRegEx(a,c,b,d)
    this.versions.r1flip2 = twoRegEx(d,b,c,a)
    console.log(this.match, this.versions)
  }

  upgrade(str: string): [string, boolean]{
    if (this.match.test(str)) {
      return [this.output, true]
    } else if (this.matches(str)) {
      return [this.output, false]
    } else {
      return null
    }
  }

  matches(str: string) {
    for (let key of Object.keys(this.versions))
      if (this.versions[key].test(str)) return true

    return false
  }
}

let threeRegEx = (function(...r: string[]) {
  return RegExp(`
      ${r[1]}${r[2]}${r[3]}/
      ${r[4]}${r[5]}${r[6]}/
      ${r[7]}${r[8]}${r[9]}
    `.replace(/( |\r|\n)/g,'').replace(/\./g,'\\.'))
}).bind(null, '')

export class Trans3 {
  _in: string[] = []
  match: RegExp
  versions: {
    [index: string]: RegExp
  } = {}
  length = 3
  constructor(private input: string, private output: string) {
    let [_, a, b, c, d, e, f, g, h, i] = input.match(/(.)(.)(.)\/(.)(.)(.)\/(.)(.)(.)/)
    this._in.push(_, a, b, c, d, e, f, g, h, i)
    this.match = threeRegEx(a,b,c,d,e,f,g,h,i)
    this.versions.rotation1 = threeRegEx(g,d,a,h,e,b,i,f,c)
    this.versions.rotation2 = threeRegEx(i,h,g,f,e,d,c,b,a)
    this.versions.rotation3 = threeRegEx(c,f,i,b,e,h,a,d,g)
    this.versions.r0flip1 = threeRegEx(g,h,i,d,e,f,a,b,c)
    this.versions.r0flip2 = threeRegEx(c,b,a,f,e,d,i,h,g)
    this.versions.r1flip1 = threeRegEx(a,d,g,b,e,h,c,f,i)
    this.versions.r1flip2 = threeRegEx(i,f,c,h,e,b,g,d,a)

  }

  upgrade(str: string): [string, boolean]{
    if (this.match.test(str)) {
      return [this.output, true]
    } else if (this.matches(str)) {
      return [this.output, false]
    } else
      return null
  }

  matches(str: string) {
    for (let key of Object.keys(this.versions)) {
      if (this.versions[key].test(str)) return true
    }
    return false
  }
}