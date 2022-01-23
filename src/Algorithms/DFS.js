const movements = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

let Grid = [];

const trackPath = (source, destination) => {
  const path = [];
  let curNode = Grid[destination[0]][destination[1]];
  while (curNode) {
    path.push(curNode);
    curNode = curNode.parent;
  }

  return path.reverse();
};
function isValid(x, y, grid) {
  return x >= 0 && x < grid.length && y >= 0 && y < grid[0].length;
}

let visitedINOrder = [];

function dfs(source, destination, parent) {
  if (!isValid(source[0], source[1], Grid)) {
    return { destinationFound: false };
  }
  let sourceNode = Grid[source[0]][source[1]];
  if (sourceNode.isVisited || sourceNode.isWall) {
    return { destinationFound: false };
  }
  Grid[source[0]][source[1]].parent = parent;
  if (sourceNode.isDestination) {
    return { destinationFound: true };
  }

  Grid[sourceNode.row][sourceNode.col].isVisited = true;
  visitedINOrder.push(Grid[sourceNode.row][sourceNode.col]);

  let response = { destinationFound: false };

  for (let movement of movements) {
    let childX = sourceNode.row + movement[0];
    let childY = sourceNode.col + movement[1];
    response.destinationFound |= dfs(
      [childX, childY],
      destination,
      sourceNode
    ).destinationFound;
    if (response.destinationFound) {
      break;
    }
  }

  return response;
}

export default function DFS(grid, source, destination) {
  if (
    !isValid(source[0], source[1], grid) ||
    !isValid(destination[0], destination[1], grid)
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
  Grid = grid;
  let response = dfs(source, destination);
  if (response.destinationFound) {
    let path = trackPath(source, destination);
    return { status: true, visitedINOrder: visitedINOrder, path: path };
  }
  return { status: false, visitedINOrder: [], path: [] };
}
