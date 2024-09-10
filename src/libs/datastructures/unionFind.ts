class UnionFind {
  private parent: Map<number, number>
  private rank: Map<number, number>
  private count: number
  constructor(n: number) {
    this.parent = new Map()
    this.rank = new Map()
    this.count = 0
    for (let i = 0; i < n; i++) {
      this.parent.set(i, i)
      this.rank.set(i, 0)
    }
  }

  find(n: number): number {
    const p = this.parent.get(n)!
    if (n === p) {
      return p
    }
    const root = this.find(p)!
    this.parent.set(n, root)
    return root
  }

  union(n1: number, n2: number): boolean {
    const p1 = this.find(n1)
    const p2 = this.find(n2)
    if (p1 === p2) return false

    const p1rank = this.rank.get(p1)!
    const p2rank = this.rank.get(p2)!
    if (p1rank > p2rank) {
      this.parent.set(p2, p1)
    } else if (p1rank < p2rank) {
      this.parent.set(p1, p2)
    } else {
      this.parent.set(p2, p1)
      this.rank.set(p2, this.rank.get(p2)! + 1)
    }

    this.count += 1
    return true
  }

  get unionCount() {
    return this.count
  }

}

export { UnionFind }
