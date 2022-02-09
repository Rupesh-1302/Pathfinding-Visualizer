import React, { useState } from "react";
import "./Navbar.css";

function Navbar({
  handleAlgoChange,
  algo,
  visualizeAlgorithm,
  handleClearPath,
  createMaze,
  handleClearWalls,
  algoInProgress,
}) {
  console.log(algoInProgress);
  const [algoSelect, setAlgoSelect] = useState(false);
  const [mazeSelect, setMazeSelect] = useState(false);
  function handleAlgorithmSelect() {
    setAlgoSelect((algoSelect) => {
      return !algoSelect;
    });
  }
  function handleMazeSelect() {
    setMazeSelect((mazeSelect) => {
      return !mazeSelect;
    });
  }
  return (
    <nav className="w-100 bg-indigo-500 h-20 shadow">
      <ul className="flex w-full h-full mx-6 text-white items-baseline justify-around">
        <li className="flex-initial tracking-wide w-48 mr-4 text-3xl h-full font-extrabold py-4 drop-shadow-xl">
          Path Finder
        </li>
        <li className="flex-initial relative w-30 text-2xl h-full font-bold box-border hover:bg-indigo-600 hover:text-white">
          <button
            className="algo-select-button text-center px-2 py-4 box-border h-full drop-shadow-xl"
            onClick={handleAlgorithmSelect}
            disabled={algoInProgress}
          >
            Algorithm
          </button>
          <div
            id="algo-select"
            style={{
              display: algoSelect ? "block" : "none",
            }}
            className="algo-dropdown w-60 flex flex-col text-black  text-center shadow "
          >
            <div
              id="Astar"
              onClick={() => {
                handleAlgoChange("Astar");
                handleAlgorithmSelect();
              }}
              className="algo-dropdown-item flex-initial box-border py-6 h-20 w-full hover:bg-indigo-600 hover:text-white"
            >
              A*
            </div>
            <div
              id="Dijkstra"
              onClick={() => {
                handleAlgoChange("Dijkstra");
                handleAlgorithmSelect();
              }}
              className=" algo-dropdown-item flex-initial box-border py-6 h-20 w-full hover:bg-indigo-600 hover:text-white"
            >
              Dijkstra's
            </div>
            <div
              id="DFS"
              onClick={() => {
                handleAlgoChange("DFS");
                handleAlgorithmSelect();
              }}
              className=" algo-dropdown-item  flex-initial box-border py-6 h-20 w-full hover:bg-indigo-600 hover:text-white"
            >
              DFS
            </div>
            <div
              id="BFS"
              onClick={() => {
                handleAlgoChange("BFS");
                handleAlgorithmSelect();
              }}
              className=" algo-dropdown-item  flex-initial box-border py-6 h-20 w-full hover:bg-indigo-600 hover:text-white"
            >
              BFS
            </div>
          </div>
        </li>
        <li className="flex-initial relative w-30 text-2xl h-full font-bold box-border hover:bg-indigo-600 hover:text-white">
          <button
            className="maze-select-button text-center px-2 py-4 box-border h-full drop-shadow-xl"
            onClick={handleMazeSelect}
            disabled={algoInProgress}
          >
            Maze {"&"} pattern
          </button>
          <div
            id="algo-select"
            style={{
              display: mazeSelect ? "block" : "none",
            }}
            className="maze-dropdown w-64 flex flex-col text-black  text-center shadow "
          >
            <div
              id="RandomizeDFS"
              onClick={() => {
                createMaze("RandomizeDFS");
                handleMazeSelect();
              }}
              className="maze-dropdown-item flex-initial box-border py-6 h-24 w-full hover:bg-indigo-600 hover:text-white"
            >
              Randomize DFS
            </div>
            <div
              id="RecursiveDivision"
              onClick={() => {
                createMaze("RecursiveDivision");
                handleMazeSelect();
              }}
              className=" maze-dropdown-item flex-initial box-border py-6 h-24 w-full hover:bg-indigo-600 hover:text-white"
            >
              Recursive Division
            </div>
            <div
              id="RecursiveDivisionWeights"
              onClick={() => {
                createMaze("RecursiveDivisionWeights");
                handleMazeSelect();
              }}
              className=" maze-dropdown-item flex-initial box-border py-6 h-24 w-full hover:bg-indigo-600 hover:text-white"
            >
              Recursive Division (Weights)
            </div>
            <div
              id="RandomizeDFSWeights"
              onClick={() => {
                createMaze("RandomizeDFSWeights");
                handleMazeSelect();
              }}
              className=" maze-dropdown-item flex-initial box-border py-6 h-24 w-full hover:bg-indigo-600 hover:text-white"
            >
              Randomize DFS (Weights)
            </div>
          </div>
        </li>

        <li className="flex-initial relative w-52 text-center text-2xl h-full font-bold box-border">
          <button
            onClick={visualizeAlgorithm}
            className="text-center drop-shadow-xl px-2 py-4 box-border rounded-xl  shadow  visualization-button"
            disabled={algoInProgress}
          >
            Visualize {algo}
          </button>
        </li>
        <li className="flex-initial relative w-30 text-2xl h-full font-bold box-border hover:bg-indigo-600 hover:text-white">
          <button
            className="algo-select-button text-center px-2 py-4 box-border h-full drop-shadow-xl"
            onClick={handleClearPath}
            disabled={algoInProgress}
          >
            Clear Path
          </button>
        </li>
        <li className="flex-initial relative w-30 text-2xl h-full font-bold box-border hover:bg-indigo-600 hover:text-white">
          <button
            className="algo-select-button text-center px-2 py-4 box-border h-full drop-shadow-xl"
            onClick={handleClearWalls}
            disabled={algoInProgress}
          >
            Clear Walls {"&"} weights
          </button>
        </li>
        {/* <li className="flex-initial relative w-30 text-2xl h-full font-bold box-border hover:bg-indigo-600 hover:text-white">
          <button
            className="algo-select-button text-center px-2 py-4 box-border h-full drop-shadow-xl"
            onClick={handleClearPath}
            disabled={algoInProgress}
          >
            Clear Path
          </button>
        </li> */}
      </ul>
    </nav>
  );
}

export default Navbar;
