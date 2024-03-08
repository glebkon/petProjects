class MinHeap {
  constructor() {
    this.heap = [];
  }

  insert(value) {
    this.heap.push(value);
    this.bubbleUp(this.heap.length - 1);
  }

  extractMin() {
    const min = this.heap[0];

    const last = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = last;
      this.bubbleDown(0);
    }

    return min;
  }

  bubbleUp(index) {
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2); // compares the newly inserted element with its parent and swaps them if the parent's value is greater
      if (this.heap[parentIndex].value <= this.heap[index].value) break;
      [this.heap[parentIndex], this.heap[index]] = [
        this.heap[index],
        this.heap[parentIndex],
      ];
      index = parentIndex; // this process continues iteratively until the newly inserted element reaches its correct position in the heap or until it becomes the root node
    }
  }

  bubbleDown(index) {
    while (true) {
      const leftChild = 2 * index + 1;
      const rightChild = 2 * index + 2;
      let smallest = index;
      if (
        leftChild < this.heap.length &&
        this.heap[leftChild].value < this.heap[smallest].value
      ) {
        smallest = leftChild;
      }
      if (
        rightChild < this.heap.length &&
        this.heap[rightChild].value < this.heap[smallest].value
      ) {
        smallest = rightChild;
      }
      if (smallest === index) {
        break;
      }
      [this.heap[index], this.heap[smallest]] = [
        this.heap[smallest],
        this.heap[index],
      ];
      index = smallest;
    }
  }

  isEmpty() {
    return this.heap.length === 0;
  }
}

function merge_piles(piles) {
  let ans = [];
  const minHeap = new MinHeap();

  // Initialize the min-heap with the top element of each pile
  for (let i = 0; i < piles.length; i++) {
    if (piles[i].length > 0) {
      minHeap.insert({ value: piles[i][piles[i].length - 1], pileIndex: i });
    }
  }

  // Extract the minimum element from the min-heap and merge piles
  while (!minHeap.isEmpty()) {
    const { value, pileIndex } = minHeap.extractMin();
    ans.push(value);
    piles[pileIndex].pop();
    if (piles[pileIndex].length > 0) {
      minHeap.insert({
        value: piles[pileIndex][piles[pileIndex].length - 1],
        pileIndex,
      });
    }
  }

  return ans;
}

export default merge_piles;
