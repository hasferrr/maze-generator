class MinHeap<T> {
  heap: T[]
  compare: (a: T, b: T) => number
  constructor(compare: (a: T, b: T) => number) {
    this.heap = []
    this.compare = compare
  }

  private lessThan(a: T, b: T): boolean {
    return this.compare(a, b) < 0
  }

  insert(val: T): void {
    this.heap.push(val)
    this.reorderUp(this.size() - 1)
  }

  pop(): T | undefined {
    if (this.isEmpty()) return undefined
    this.swap(0, this.size() - 1)
    const top = this.heap.pop()
    this.reorderDown(0)
    return top
  }

  size(): number {
    return this.heap.length
  }

  isEmpty(): boolean {
    return this.size() === 0
  }

  top(): T | undefined {
    return this.heap[0]
  }

  private swap(i: number, j: number) {
    const temp = this.heap[i]
    this.heap[i] = this.heap[j]
    this.heap[j] = temp
  }

  private getParentIndex(i: number): number {
    return Math.floor((i - 1) / 2)
  }

  private getChildrenIndex(i: number): [number, number] {
    const l = 2 * i + 1
    const r = l + 1
    return [l, r]
  }

  private reorderUp(i: number): void {
    if (i === 0) return
    const par = this.getParentIndex(i)
    if (this.lessThan(this.heap[i], this.heap[par])) {
      this.swap(i, par)
      return this.reorderUp(par)
    }
  }

  private reorderDown(i: number): void {
    const [l, r] = this.getChildrenIndex(i)
    if (l >= this.size()) {
      return
    }

    let child: number
    if (r >= this.size()) {
      child = l
    } else {
      child = this.lessThan(this.heap[r], this.heap[l]) ? r : l
    }

    if (!this.lessThan(this.heap[i], this.heap[child])) {
      this.swap(i, child)
      return this.reorderDown(child)
    }
  }
}

export { MinHeap }
