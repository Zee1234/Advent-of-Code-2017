class Queue<T> {
  private _q: T[] = []

  push(v: T) {
    this._q.push(v)
  }
  pop() {
    let t = this._q[0]
    this._q = this._q.filter( (_, i) => i )
    return t
  }
}

export {Queue}