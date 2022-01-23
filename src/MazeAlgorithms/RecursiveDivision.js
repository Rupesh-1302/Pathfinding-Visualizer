let walls = [];

function getOrientation(width, height) {
  if (width < height) {
    return "horizontal";
  } else if (width > height) {
    return "verical";
  } else {
    let randomOrientation = Math.floor(Math.random() * 2);
    return randomOrientation === 1 ? "horizontal" : "vertical";
  }
}

export default function RecursiveDivision(
  grid,
  surroundingWalls,
  rowStart,
  rowEnd,
  colStart,
  colEnd,
  type = "wall"
) {
  if (rowEnd < rowStart || colEnd < colStart) {
    return walls;
  }

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
            if (type === "wall") {
              node.isWall = true;
              node.isVisited = true;
              walls.push(node);
            } else {
              node.isWeight = true;
              node.isVisited = true;
              walls.push(node);
            }
          }
        }
      }
    }

    surroundingWalls = true;
  }

  let orientation = getOrientation(
    colEnd - colStart + 1,
    rowEnd - rowStart + 1
  );
  if (orientation === "horizontal") {
    let possibleCols = [];
    for (let j = colStart - 1; j <= colEnd + 1; j += 2) {
      possibleCols.push(j);
    }
    let randomCol =
      possibleCols[Math.floor(Math.random() * possibleCols.length)];
    let possibleRows = [];

    for (let j = rowStart; j <= rowEnd; j += 2) {
      possibleRows.push(j);
    }
    let randomRow =
      possibleRows[Math.floor(Math.random() * possibleRows.length)];

    for (let j = colStart - 1; j <= colEnd + 1; j++) {
      if (
        j !== randomCol &&
        !grid[randomRow][j].isSource &&
        !grid[randomRow][j].isDestination
      ) {
        if (type === "wall") {
          grid[randomRow][j].isWall = true;
        } else {
          grid[randomRow][j].isWeight = true;
        }
        walls.push(grid[randomRow][j]);
      }
    }

    RecursiveDivision(
      grid,
      surroundingWalls,
      rowStart,
      randomRow - 2,
      colStart,
      colEnd,
      type
    );
    RecursiveDivision(
      grid,
      surroundingWalls,
      randomRow + 2,
      rowEnd,
      colStart,
      colEnd,
      type
    );
  } else {
    let possibleCols = [];
    for (let j = colStart; j <= colEnd; j += 2) {
      possibleCols.push(j);
    }
    let randomCol =
      possibleCols[Math.floor(Math.random() * possibleCols.length)];
    let possibleRows = [];

    for (let j = rowStart - 1; j <= rowEnd + 1; j += 2) {
      possibleRows.push(j);
    }
    let randomRow =
      possibleRows[Math.floor(Math.random() * possibleRows.length)];

    for (let j = rowStart - 1; j <= rowEnd + 1; j++) {
      if (
        j !== randomRow &&
        !grid[j][randomCol].isSource &&
        !grid[j][randomCol].isDestination
      ) {
        if (type === "wall") {
          grid[j][randomCol].isWall = true;
        } else {
          grid[j][randomCol].isWeight = true;
        }
        walls.push(grid[j][randomCol]);
      }
    }

    RecursiveDivision(
      grid,
      surroundingWalls,
      rowStart,
      rowEnd,
      colStart,
      randomCol - 2,
      type
    );
    RecursiveDivision(
      grid,
      surroundingWalls,
      rowStart,
      rowEnd,
      randomCol + 2,
      colEnd,
      type
    );
  }
  return walls;
}
