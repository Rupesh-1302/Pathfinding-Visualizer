const top = 0;
const parent = (i) => ((i + 1) >>> 1) - 1;
const left = (i) => (i << 1) + 1;
const right = (i) => (i + 1) << 1;

class PriorityQueue {
  constructor(comparator = (a, b) => a > b) {
    this._heap = [];
    this._comparator = comparator;
  }
  size() {
    return this._heap.length;
  }
  isEmpty() {
    return this.size() === 0;
  }
  peek() {
    return this._heap[top];
  }
  push(...values) {
    values.forEach((value) => {
      this._heap.push(value);
      this._siftUp();
    });
    return this.size();
  }
  pop() {
    const poppedValue = this.peek();
    const bottom = this.size() - 1;
    if (bottom > top) {
      this._swap(top, bottom);
    }
    this._heap.pop();
    this._siftDown();
    return poppedValue;
  }
  replace(value) {
    const replacedValue = this.peek();
    this._heap[top] = value;
    this._siftDown();
    return replacedValue;
  }
  _greater(i, j) {
    return this._comparator(this._heap[i], this._heap[j]);
  }
  _swap(i, j) {
    [this._heap[i], this._heap[j]] = [this._heap[j], this._heap[i]];
  }
  _siftUp() {
    let node = this.size() - 1;
    while (node > top && this._greater(node, parent(node))) {
      this._swap(node, parent(node));
      node = parent(node);
    }
  }
  _siftDown() {
    let node = top;
    while (
      (left(node) < this.size() && this._greater(left(node), node)) ||
      (right(node) < this.size() && this._greater(right(node), node))
    ) {
      let maxChild =
        right(node) < this.size() && this._greater(right(node), left(node))
          ? right(node)
          : left(node);
      this._swap(node, maxChild);
      node = maxChild;
    }
  }
}

const movements = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

const trackPath = (source, destination, grid) => {
  const path = [];
  let curNode = grid[destination[0]][destination[1]];
  while (curNode) {
    path.push(curNode);
    curNode = curNode.parent;
  }

  return path.reverse();
};

export default function Astar(grid, source, destination) {
  function isValid(x, y) {
    return x >= 0 && x < grid.length && y >= 0 && y < grid[0].length;
  }
  function calcHeuristic(x, y) {
    return Math.abs(x - destination[0]) + Math.abs(y - destination[1]);
  }
  if (
    !isValid(source[0], source[1]) ||
    !isValid(destination[0], destination[1])
  ) {
    return { status: false, visitedINOrder: [], path: [] };
  }
  if (source[0] === destination[0] && source[1] === destination[1]) {
    return {
      status: true,
      visitedINOrder: [grid[source[0]][source[1]]],
      path: [grid[source[0]][source[1]]],
    };
  }
  let destinationFound = false;
  const visitedINOrder = [];
  const priorityQueue = new PriorityQueue((a, b) => a.distance < b.distance);
  grid[source[0]][source[1]].distance = 0;
  let curNode = grid[source[0]][source[1]];
  priorityQueue.push({ distance: curNode.distance, node: curNode });
  while (!priorityQueue.isEmpty()) {
    if (destinationFound) {
      break;
    }
    curNode = priorityQueue.pop();
    grid[curNode.node.row][curNode.node.col].isVisited = true;
    visitedINOrder.push(grid[curNode.node.row][curNode.node.col]);
    for (let movement of movements) {
      let childX = curNode.node.row + movement[0];
      let childY = curNode.node.col + movement[1];
      if (isValid(childX, childY)) {
        let child = grid[childX][childY];
        if (child.isVisited === false && child.isWall === false) {
          let childDistance = curNode.node.distance + child.weight;
          let childHeuristic = calcHeuristic(childX, childY);
          if (child.isDestination) {
            grid[childX][childY].distance = childDistance;
            grid[childX][childY].parent = curNode.node;
            grid[child.row][child.col].isVisited = true;
            visitedINOrder.push(grid[child.row][child.col]);
            destinationFound = true;
            break;
          }
          if (child.distance > childDistance) {
            grid[childX][childY].distance = childDistance;
            grid[childX][childY].parent = curNode.node;
            child.distance = childDistance;
            child.parent = curNode.node;
            priorityQueue.push({
              distance: childDistance + childHeuristic,
              node: child,
            });
          }
        }
      }
    }
  }

  let path = trackPath(source, destination, grid);
  return { status: true, visitedINOrder: visitedINOrder, path: path };
}
