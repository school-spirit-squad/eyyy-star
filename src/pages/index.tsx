import { useEffect, useState } from "react";
import ControlPanel from "@/components/control-panel";
import { useMazeGenerator } from "@/hooks/useMazeGenerator";
import { usePlayerMovement } from "@/hooks/usePlayerMovement";
import { useAStarVisualization } from "@/hooks/useAStarVisualization";
import GameBoard from "@/components/game-board";

const Index = () => {
  const [isManualMode, setIsManualMode] = useState(true);
  const [hasWon, setHasWon] = useState(false);

  const {
    mazeData,
    mazeSize,
    setMazeSize,
    initializeMaze,
    optimalPathLength,
    optimalPath,
  } = useMazeGenerator();

  const { playerPosition, resetPlayer, movePlayer } = usePlayerMovement(
    mazeData,
    mazeSize,
    isManualMode,
    optimalPathLength,
    () => setHasWon(true)
  );

  const {
    isRunningAStar,
    visitedCells,
    pathCells,
    visualizationSpeed,
    setVisualizationSpeed,
    runAStar,
    resetVisualization,
  } = useAStarVisualization(mazeData, () => setHasWon(true));

  useEffect(() => {
    if (mazeData) {
      resetPlayer(mazeData.start);
      resetVisualization();
      setHasWon(false);
    }
  }, [mazeData, resetPlayer, resetVisualization]);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <header className="bg-blue-900 text-white p-4 shadow-md">
        <h1 className="text-3xl font-bold text-center">Maze Solver</h1>
        <p className="text-center text-blue-200">
          Navigate the maze manually or watch the A* algorithm find the optimal
          path
        </p>
      </header>

      <main className="flex-grow flex flex-col lg:flex-row p-4 gap-6">
        <div className="lg:w-3/4 flex justify-center items-center">
          <GameBoard
            mazeData={mazeData}
            playerPosition={playerPosition}
            visitedCells={visitedCells}
            pathCells={pathCells}
            hasWon={hasWon}
            isManualMode={isManualMode}
            isRunningAStar={isRunningAStar}
            movePlayer={movePlayer}
          />
        </div>

        <ControlPanel
          mazeSize={mazeSize}
          setMazeSize={setMazeSize}
          isManualMode={isManualMode}
          setIsManualMode={setIsManualMode}
          initializeMaze={initializeMaze}
          runAStar={runAStar}
          isRunningAStar={isRunningAStar}
          visualizationSpeed={visualizationSpeed}
          setVisualizationSpeed={setVisualizationSpeed}
          hasWon={hasWon}
          optimalPathLength={optimalPathLength}
          optimalPath={optimalPath}
        />
      </main>
    </div>
  );
};

export default Index;
