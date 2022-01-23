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

export default function BFS(grid, source, destination) {
  function isValid(x, y) {
    return x >= 0 && x < grid.length && y >= 0 && y < grid[0].length;
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
  const queue = [];
  grid[source[0]][source[1]].distance = 0;
  grid[source[0]][source[1]].isVisited = true;
  visitedINOrder.push(grid[source[0]][source[1]]);
  let curNode = grid[source[0]][source[1]];
  queue.push(curNode);
  while (queue.length !== 0) {
    if (destinationFound) {
      break;
    }
    curNode = queue[0];
    queue.shift();
    for (let movement of movements) {
      let childX = curNode.row + movement[0];
      let childY = curNode.col + movement[1];
      if (isValid(childX, childY)) {
        let child = grid[childX][childY];
        if (child.isVisited === false && child.isWall === false) {
          let childDistance = curNode.distance + 1;
          grid[childX][childY].distance = childDistance;
          grid[childX][childY].parent = curNode;
          grid[childX][childY].isVisited = true;
          visitedINOrder.push(grid[childX][childY]);
          if (grid[childX][childY].isDestination) {
            destinationFound = true;
            break;
          }
          queue.push(grid[childX][childY]);
        }
      }
    }
  }

  let path = trackPath(source, destination, grid);
  return { status: true, visitedINOrder: visitedINOrder, path: path };
}
