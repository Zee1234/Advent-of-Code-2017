export interface TreePreDef {
  name: string,
  weight: number,
  children: string[]
}

export class TreeMember {
  name: string
  weight: number
  children: string[]
  parent: string
  totalWeight: number
  Tree: Tree

  constructor(tree: Tree) {
    this.Tree = tree
  }

  getParent() {
    return this.parent ? this.Tree.get(this.parent) : this
  }

  getTotalWeight(): number {
    if (this.totalWeight) return this.totalWeight
    if (!(this.children && this.children.length)) {
      this.totalWeight = this.weight
    } else {
      this.totalWeight = this.children.reduce( (acc, child) => {
        return this.Tree.get(child).getTotalWeight() + acc
      }, this.weight)
    }
    
    return this.totalWeight
  }

  forChildren( callback: (child: TreeMember, tree: Tree, self: TreeMember) => void ) {
    if (!this.children) return false
    this.children.forEach( (child) => {
      callback(this.Tree.get(child), this.Tree, this)
    })
  }

  weightOfChildren(): {child: TreeMember, weight:number}[] {
    return this.children.map( childName => {
      let child = this.Tree.get(childName)
        , weight = child.getTotalWeight()
      return {child, weight}
    })
  }
}
export class Tree {
  private map: {
    [key: string]: TreeMember
  } = {}

  add({name, weight, children}: TreePreDef) {
    this.map[name] = this.map[name] || new TreeMember(this)
    let element = this.map[name]
    element.name = name
    element.weight = weight
    element.children = children
    if (children) {
      children.forEach( childName => {
        this.map[childName] = this.map[childName] || new TreeMember(this)
        let child = this.map[childName]
        child.parent = name
        child.name = childName
      })
    }
  }

  get(name: string) {
    return this.map[name]
  }

  getRandom() {
    return this.map[ Object.keys(this.map)[2] ]
  }

  findTop() {
    let current = this.getRandom()
    while (current !== current.getParent()) current = current.getParent()
    return current
  }
}