import Board from "./Components/Board";
import Navbar from "./Components/Navbar";
import { useState, useRef } from "react";
import "./App.css";

function App() {
  const [algo, setAlgo] = useState("Dijkstra");
  let funcRef = useRef(null);
  function visualizeAlgorithm() {
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
    funcRef.current.clearWalls();
  }
  function createMaze(maze) {
    funcRef.current.clearPath();
    funcRef.current.clearWalls();
    switch (maze) {
      case "RandomizeDFS":
        funcRef.current.randomizeDFS();
        break;
      case "RecursiveDivision":
        funcRef.current.recursiveDivision();
        break;
      case "RecursiveDivisionWeights":
        funcRef.current.recursiveDivisionWeights();
        break;
      case "RandomizeDFSWeights":
        funcRef.current.randomizeDFSWeights();
        break;
    }
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
      />
      <div className="main bg-white">
        <Board ref={funcRef} />
      </div>
    </div>
  );
}

export default App;
