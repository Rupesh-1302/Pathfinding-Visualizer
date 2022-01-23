let walls = [];
function isvalid(x, y, r, c) {
  return x >= 0 && y >= 0 && x < r && y < c;
}

function getRandomUnvisitedNeighbour(grid, node) {
  let neighbourArray = [];
  let r = grid.length;
  let c = grid[0].length;
  if (
    isvalid(node.row + 2, node.col, r, c) &&
    !grid[node.row + 2][node.col].isVisited
  ) {
    neighbourArray.push(grid[node.row + 2][node.col]);
  }
  if (
    isvalid(node.row, node.col + 2, r, c) &&
    !grid[node.row][node.col + 2].isVisited
  ) {
    neighbourArray.push(grid[node.row][node.col + 2]);
  }
  if (
    isvalid(node.row - 2, node.col, r, c) &&
    !grid[node.row - 2][node.col].isVisited
  ) {
    neighbourArray.push(grid[node.row - 2][node.col]);
  }
  if (
    isvalid(node.row, node.col - 2, r, c) &&
    !grid[node.row][node.col - 2].isVisited
  ) {
    neighbourArray.push(grid[node.row][node.col - 2]);
  }
  if (neighbourArray.length === 0) {
    return null;
  } else {
    let index = Math.floor(Math.random() * neighbourArray.length);
    return neighbourArray[index];
  }
}

export default function RandomizeDFS(grid, surroundingWalls, curNode) {
  if (!surroundingWalls) {
    walls = [];
    for (let row of grid) {
      for (let node of row) {
        if (!node.isSource && !node.isDestination) {
          if (
            node.row === 0 ||
            node.col === 0 ||
            node.row === grid.length - 1 ||
            node.col === grid[0].length - 1
          ) {
            node.isWall = true;
            node.isVisited = true;
            walls.push(node);
          }
        }
      }
    }

    surroundingWalls = true;
  }

  grid[curNode.row][curNode.col].isVisited = true;
  if (
    !grid[curNode.row + 1][curNode.col].isVisited &&
    !grid[curNode.row + 1][curNode.col].isSource &&
    !grid[curNode.row + 1][curNode.col].isDestination
  ) {
    grid[curNode.row + 1][curNode.col].isVisited = true;
    grid[curNode.row + 1][curNode.col].isWall = true;
  }
  if (
    !grid[curNode.row + 1][curNode.col + 1].isVisited &&
    !grid[curNode.row + 1][curNode.col + 1].isSource &&
    !grid[curNode.row + 1][curNode.col + 1].isDestination
  ) {
    grid[curNode.row + 1][curNode.col + 1].isVisited = true;
    grid[curNode.row + 1][curNode.col + 1].isWall = true;
  }
  if (
    !grid[curNode.row][curNode.col + 1].isVisited &&
    !grid[curNode.row][curNode.col + 1].isSource &&
    !grid[curNode.row][curNode.col + 1].isDestination
  ) {
    grid[curNode.row][curNode.col + 1].isVisited = true;
    grid[curNode.row][curNode.col + 1].isWall = true;
  }
  if (
    !grid[curNode.row + 1][curNode.col - 1].isVisited &&
    !grid[curNode.row + 1][curNode.col - 1].isSource &&
    !grid[curNode.row + 1][curNode.col - 1].isDestination
  ) {
    grid[curNode.row + 1][curNode.col - 1].isVisited = true;
    grid[curNode.row + 1][curNode.col - 1].isWall = true;
  }
  if (
    !grid[curNode.row][curNode.col - 1].isVisited &&
    !grid[curNode.row][curNode.col - 1].isSource &&
    !grid[curNode.row][curNode.col - 1].isDestination
  ) {
    grid[curNode.row][curNode.col - 1].isVisited = true;
    grid[curNode.row][curNode.col - 1].isWall = true;
  }
  if (
    !grid[curNode.row - 1][curNode.col - 1].isVisited &&
    !grid[curNode.row - 1][curNode.col - 1].isSource &&
    !grid[curNode.row - 1][curNode.col - 1].isDestination
  ) {
    grid[curNode.row - 1][curNode.col - 1].isVisited = true;
    grid[curNode.row - 1][curNode.col - 1].isWall = true;
  }
  if (
    !grid[curNode.row - 1][curNode.col].isVisited &&
    !grid[curNode.row - 1][curNode.col].isSource &&
    !grid[curNode.row - 1][curNode.col].isDestination
  ) {
    grid[curNode.row - 1][curNode.col].isVisited = true;
    grid[curNode.row - 1][curNode.col].isWall = true;
  }
  if (
    !grid[curNode.row - 1][curNode.col + 1].isVisited &&
    !grid[curNode.row - 1][curNode.col + 1].isSource &&
    !grid[curNode.row - 1][curNode.col + 1].isDestination
  ) {
    grid[curNode.row - 1][curNode.col + 1].isVisited = true;
    grid[curNode.row - 1][curNode.col + 1].isWall = true;
  }

  let neighbour = getRandomUnvisitedNeighbour(grid, curNode);

  while (neighbour) {
    if (neighbour.row - curNode.row === 2) {
      grid[curNode.row + 1][curNode.col].isWall = false;
    } else if (neighbour.row - curNode.row === -2) {
      grid[curNode.row - 1][curNode.col].isWall = false;
    } else if (neighbour.col - curNode.col === 2) {
      grid[curNode.row][curNode.col + 1].isWall = false;
    } else if (neighbour.col - curNode.col === -2) {
      grid[curNode.row][curNode.col - 1].isWall = false;
    }
    RandomizeDFS(grid, surroundingWalls, neighbour);
    neighbour = getRandomUnvisitedNeighbour(grid, curNode);
  }

  if (grid[curNode.row + 1][curNode.col].isWall) {
    walls.push(grid[curNode.row + 1][curNode.col]);
  }
  if (grid[curNode.row + 1][curNode.col + 1].isWall) {
    walls.push(grid[curNode.row + 1][curNode.col + 1]);
  }
  if (grid[curNode.row][curNode.col + 1].isWall) {
    walls.push(grid[curNode.row][curNode.col + 1]);
  }
  if (grid[curNode.row + 1][curNode.col - 1].isWall) {
    walls.push(grid[curNode.row + 1][curNode.col - 1]);
  }
  if (grid[curNode.row][curNode.col - 1].isWall) {
    walls.push(grid[curNode.row][curNode.col - 1]);
  }
  if (grid[curNode.row - 1][curNode.col - 1].isWall) {
    walls.push(grid[curNode.row - 1][curNode.col - 1]);
  }
  if (grid[curNode.row - 1][curNode.col].isWall) {
    walls.push(grid[curNode.row - 1][curNode.col]);
  }
  if (grid[curNode.row - 1][curNode.col + 1].isWall) {
    walls.push(grid[curNode.row - 1][curNode.col + 1]);
  }

  return walls;
}
