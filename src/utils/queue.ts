class Node<T> {
  value: T
  next: Node<T> | null

  constructor(value: T) {
    this.value = value
    this.next = null
  }
}

class SinglyLinkedListQueue<T> {
  private head: Node<T> | null = null
  private tail: Node<T> | null = null
  private size: number = 0

  push(value: T): void {
    const newNode = new Node(value)
    if (this.tail) {
      this.tail.next = newNode
      this.tail = newNode
    } else {
      this.head = this.tail = newNode
    }
    this.size++
  }

  shift(): T | null {
    if (!this.head) return null
    const value = this.head.value
    this.head = this.head.next
    if (!this.head) {
      this.tail = null
    }
    this.size--
    return value
  }

  isEmpty(): boolean {
    return this.size === 0
  }

  get length() {
    return this.size
  }
}

export { SinglyLinkedListQueue }
