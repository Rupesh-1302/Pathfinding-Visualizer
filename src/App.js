import Board from "./Components/Board";
import Navbar from "./Components/Navbar";
import { useState, useRef } from "react";
import "./App.css";

function App() {
  const [algo, setAlgo] = useState("Dijkstra");
  const [algoInProgress, setAlgoInProgress] = useState(false);
  let funcRef = useRef(null);
  async function visualizeAlgorithm() {
    setAlgoInProgress(true);
    funcRef.current.clearPath();
    switch (algo) {
      case "Dijkstra":
        funcRef.current.visualizeDijkstra();
        break;
      case "BFS":
        funcRef.current.visualizeBFS();
        break;
      case "DFS":
        funcRef.current.visualizeDFS();
        break;
      case "Astar":
        funcRef.current.visualizeAstar();
        break;
      default:
        funcRef.current.visualizeDijkstra();
    }
  }
  function handleClearPath() {
    funcRef.current.clearPath();
  }
  function handleClearWalls() {
    funcRef.current.clearPath();
    funcRef.current.clearWalls();
  }
  async function createMaze(maze) {
    setAlgoInProgress(true);
    funcRef.current.clearPath();
    funcRef.current.clearWalls();
    switch (maze) {
      case "RandomizeDFS":
        await funcRef.current.randomizeDFS();
        break;
      case "RecursiveDivision":
        await funcRef.current.recursiveDivision();
        break;
      case "RecursiveDivisionWeights":
        await funcRef.current.recursiveDivisionWeights();
        break;
      case "RandomizeDFSWeights":
        await funcRef.current.randomizeDFSWeights();
        break;
    }

    setAlgoInProgress(false);
  }
  function handleAlgoChange(algorithm) {
    setAlgo(algorithm);
  }
  return (
    <div className="App ">
      <Navbar
        handleAlgoChange={handleAlgoChange}
        algo={algo}
        visualizeAlgorithm={visualizeAlgorithm}
        handleClearPath={handleClearPath}
        handleClearWalls={handleClearWalls}
        createMaze={createMaze}
        algoInProgress={algoInProgress}
      />
      <div className="main bg-white">
        <Board ref={funcRef} setAlgoInProgress={setAlgoInProgress} />
      </div>
    </div>
  );
}

export default App;
