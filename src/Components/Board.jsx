import React, { useState, useEffect, useImperativeHandle } from "react";
import Dijkstra from "../Algorithms/Dijkstra";
import Astar from "../Algorithms/Astar";
import BFS from "../Algorithms/BFS";
import DFS from "../Algorithms/DFS";
import RandomizeDFS from "../MazeAlgorithms/RandomizeDFS";
import RecursiveDivision from "../MazeAlgorithms/RecursiveDivision";
import "./Board.css";
const ROWS = 22;
const INF = 1e9 + 17;
const COLS = 70;
const SOURCE = [5, 20];
const DESTINATION = [5, 50];
class NodeClass {
  constructor(
    id = null,
    isSource = false,
    isDestination = false,
    row = -1,
    col = -1,
    distance = INF,
    parent = null,
    isVisited = false,
    heuristics = 0,
    isWall = false,
    weight = 1,
    isWeight = false
  ) {
    this.id = id;
    this.isSource = isSource;
    this.isDestination = isDestination;
    this.row = row;
    this.col = col;
    this.distance = distance;
    this.parent = parent;
    this.isVisited = isVisited;
    this.heuristics = heuristics;
    this.isWall = isWall;
    this.isWeight = isWeight;
    this.weight = weight;
  }
}
function Board(props, ref) {
  const [grid, setGrid] = useState([]);
  const [valueGrid, setValueGrid] = useState([]);
  const [visitedNodeOrder, setVisitedNodeOrder] = useState([]);
  const [path, setPath] = useState([]);
  let isSourceClicked = false;
  let isDestinationClicked = false;
  let isMouseClicked = false;

  useEffect(() => {
    formGrid();
  }, []);

  useEffect(() => {
    async function visualizationEffect() {
      function timeout(delay) {
        return new Promise((res) => setTimeout(res, delay));
      }
      async function changeClassToVisited() {
        if (visitedNodeOrder.length !== 0) {
          for (let node of visitedNodeOrder) {
            if (!node.isSource && !node.isDestination) {
              let HTMLnode = document.getElementById(node.id);
              HTMLnode.classList.add("visited-node");
              await timeout(10);
            }
          }
        }
      }
      await changeClassToVisited();
      async function changeClassToPathNode() {
        if (path.length !== 0) {
          for (let node of path) {
            let HTMLnode = document.getElementById(node.id);
            HTMLnode.classList.add("path-node");
            await timeout(50);
          }
        }
      }

      await changeClassToPathNode();
      props.setAlgoInProgress(false);
    }
    visualizationEffect();
  }, [visitedNodeOrder, path]);

  function handleMouseDown(node) {
    if (node.isSource) {
      isSourceClicked = true;
      isMouseClicked = true;
    } else if (node.isDestination) {
      isDestinationClicked = true;
      isMouseClicked = true;
    } else {
      node.isWall = !node.isWall;
      let elem = document.getElementById(node.id);
      elem.classList.toggle("wall-node");
      isMouseClicked = true;
    }
  }
  function handleMouseUp(node) {
    if (isMouseClicked) {
      isMouseClicked = false;
    }
    if (isSourceClicked) {
      isSourceClicked = false;
    }
    if (isDestinationClicked) {
      isDestinationClicked = false;
    }
  }
  function handleMouseLeave(node) {
    if (isMouseClicked) {
      if (isSourceClicked) {
        let elem = document.getElementById(node.id);
        elem.classList.remove("source-node");
        node.isSource = false;
      } else if (isDestinationClicked) {
        let elem = document.getElementById(node.id);
        elem.classList.remove("destination-node");
        node.isDestination = false;
      }
    }
  }
  function handleMouseEnter(node) {
    if (isMouseClicked) {
      if (isSourceClicked) {
        let elem = document.getElementById(node.id);
        elem.classList.add("source-node");
        SOURCE[0] = node.row;
        SOURCE[1] = node.col;
        node.isSource = true;
      } else if (isDestinationClicked) {
        let elem = document.getElementById(node.id);
        elem.classList.add("destination-node");
        DESTINATION[0] = node.row;
        DESTINATION[1] = node.col;
        node.isDestination = true;
      } else {
        if (node.isDestination === false && node.isSource === false) {
          node.isWall = !node.isWall;
          let elem = document.getElementById(node.id);
          elem.classList.toggle("wall-node");
        }
      }
    }
  }

  const formGrid = () => {
    let newHTMLGrid = [];
    let newValueGrid = [];

    for (let row = 0; row < ROWS; row++) {
      let rowVal = [];
      for (let col = 0; col < COLS; col++) {
        let id = `${row}-${col}`;
        let isSource = row === SOURCE[0] && col === SOURCE[1];
        let isDestination = row === DESTINATION[0] && col === DESTINATION[1];
        let node = new NodeClass(id, isSource, isDestination, row, col);
        rowVal.push(node);
      }
      newValueGrid.push(rowVal);
    }
    newHTMLGrid = newValueGrid.map((row, rowIdx) => {
      let rowarr = row.map((node, colIdx) => {
        return (
          <div
            className={`node ${
              rowIdx === SOURCE[0] && colIdx === SOURCE[1] ? "source-node" : ""
            } ${
              rowIdx === DESTINATION[0] && colIdx === DESTINATION[1]
                ? "destination-node"
                : ""
            }`}
            key={node.id}
            id={node.id}
            onMouseDown={() => {
              handleMouseDown(node);
            }}
            onMouseEnter={() => {
              handleMouseEnter(node);
            }}
            onMouseUp={() => {
              handleMouseUp(node);
            }}
            onMouseLeave={() => {
              handleMouseLeave(node);
            }}
          ></div>
        );
      });
      return (
        <div className="row" key={rowIdx}>
          {rowarr}
        </div>
      );
    });
    setValueGrid(newValueGrid);
    setGrid(newHTMLGrid);
  };

  useImperativeHandle(
    ref,
    () => ({
      visualizeDijkstra: () => {
        const { status, visitedINOrder, path } = Dijkstra(
          valueGrid,
          SOURCE,
          DESTINATION
        );
        if (status) {
          setVisitedNodeOrder(visitedINOrder);
          setPath(path);
        }
      },
      visualizeAstar: () => {
        const { status, visitedINOrder, path } = Astar(
          valueGrid,
          SOURCE,
          DESTINATION
        );
        if (status) {
          setVisitedNodeOrder(visitedINOrder);
          setPath(path);
        }
      },
      visualizeBFS: () => {
        const { status, visitedINOrder, path } = BFS(
          valueGrid,
          SOURCE,
          DESTINATION
        );
        if (status) {
          setVisitedNodeOrder(visitedINOrder);
          setPath(path);
        }
      },
      visualizeDFS: () => {
        const { status, visitedINOrder, path } = DFS(
          valueGrid,
          SOURCE,
          DESTINATION
        );
        if (status) {
          console.log(path);
          setVisitedNodeOrder(visitedINOrder);
          setPath(path);
        }
      },
      clearPath: () => {
        valueGrid.map((row) => {
          row.map((node) => {
            node.distance = INF;
            node.parent = null;
            node.isVisited = false;
            node.heuristics = 0;
            let htmlElement = document.getElementById(node.id);
            if (htmlElement.classList.contains("visited-node")) {
              htmlElement.classList.remove("visited-node");
            }
            if (htmlElement.classList.contains("path-node")) {
              htmlElement.classList.remove("path-node");
            }
          });
        });
      },
      randomizeDFS: async () => {
        let walls = RandomizeDFS(
          valueGrid,
          false,
          valueGrid[SOURCE[0]][SOURCE[1]]
        );
        function timeout(delay) {
          return new Promise((res) => setTimeout(res, delay));
        }
        async function visualizeWalls() {
          for (let wall of walls) {
            valueGrid[wall.row][wall.col].isWall = true;
            valueGrid[wall.row][wall.col].isVisited = false;
            let element = document.getElementById(wall.id);
            element.classList.add("wall-node");
            await timeout(10);
          }
        }

        await visualizeWalls();
      },
      randomizeDFSWeights: async () => {
        let weights = RandomizeDFS(
          valueGrid,
          false,
          valueGrid[SOURCE[0]][SOURCE[1]]
        );

        function timeout(delay) {
          return new Promise((res) => setTimeout(res, delay));
        }
        async function visualizeWeights() {
          for (let weight of weights) {
            valueGrid[weight.row][weight.col].isWall = false;
            valueGrid[weight.row][weight.col].isVisited = false;
            valueGrid[weight.row][weight.col].isWeight = true;
            valueGrid[weight.row][weight.col].weight = 15;
            let element = document.getElementById(weight.id);
            element.classList.add("weight-node");
            await timeout(10);
          }
          console.log(valueGrid);
        }

        await visualizeWeights();
      },
      recursiveDivision: async () => {
        let walls = RecursiveDivision(
          valueGrid,
          false,
          2,
          valueGrid.length - 3,
          2,
          valueGrid[0].length - 3,
          "wall"
        );
        function timeout(delay) {
          return new Promise((res) => setTimeout(res, delay));
        }
        async function visualizeWalls() {
          for (let wall of walls) {
            valueGrid[wall.row][wall.col].isWall = true;
            valueGrid[wall.row][wall.col].isVisited = false;
            let element = document.getElementById(wall.id);
            element.classList.add("wall-node");
            await timeout(10);
          }
        }

        await visualizeWalls();
      },
      recursiveDivisionWeights: async () => {
        let weights = RecursiveDivision(
          valueGrid,
          false,
          2,
          valueGrid.length - 3,
          2,
          valueGrid[0].length - 3,
          "weight"
        );
        function timeout(delay) {
          return new Promise((res) => setTimeout(res, delay));
        }
        async function visualizeWeights() {
          for (let weight of weights) {
            valueGrid[weight.row][weight.col].isWeight = true;
            valueGrid[weight.row][weight.col].weight = 15;
            let element = document.getElementById(weight.id);
            element.classList.add("weight-node");
            await timeout(10);
          }
        }

        await visualizeWeights();
      },
      clearWalls: () => {
        valueGrid.forEach((row) => {
          row.forEach((node) => {
            if (node.isWall) {
              node.isWall = false;
              let HTMLElement = document.getElementById(node.id);
              HTMLElement.classList.remove("wall-node");
            }
            if (node.isWeight) {
              node.isWeight = false;
              node.weight = 1;
              let HTMLElement = document.getElementById(node.id);
              HTMLElement.classList.remove("weight-node");
            }
          });
        });
      },
    }),
    [valueGrid]
  );
  return (
    <div className="grid">
      {/* //{" "}
      <button className="visualize-button" onClick={clearWalls}>
        // clear walls //{" "}
      </button> */}
      {grid}
    </div>
  );
}

export default React.forwardRef(Board);
