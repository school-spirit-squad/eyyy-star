import { MazeData, Position } from "@/types/maze";
import { Direction } from "@/utils/maze-helpers";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from "lucide-react";
import MazeGrid from "@/components/maze-grid";

interface GameBoardProps {
  mazeData: MazeData | null;
  playerPosition: Position | null;
  visitedCells: Position[];
  pathCells: Position[];
  hasWon: boolean;
  isManualMode: boolean;
  isRunningAStar: boolean;
  movePlayer: (direction: Direction) => void;
}

const GameBoard = ({
  mazeData,
  playerPosition,
  visitedCells,
  pathCells,
  hasWon,
  isManualMode,
  isRunningAStar,
  movePlayer,
}: GameBoardProps) => {
  if (!mazeData) {
    return <div className="text-gray-500">Loading maze...</div>;
  }

  return (
    <div className="space-y-6">
      <MazeGrid
        mazeData={mazeData}
        playerPosition={playerPosition}
        visitedCells={visitedCells}
        pathCells={pathCells}
        hasWon={hasWon}
      />

      {isManualMode && (
        <div className="flex flex-col items-center mt-4">
          <div className="grid grid-cols-3 gap-2">
            <div></div>
            <Button
              variant="outline"
              onClick={() => movePlayer("up")}
              disabled={isRunningAStar || hasWon}
              className="p-3"
            >
              <ArrowUp />
            </Button>
            <div></div>
            <Button
              variant="outline"
              onClick={() => movePlayer("left")}
              disabled={isRunningAStar || hasWon}
              className="p-3"
            >
              <ArrowLeft />
            </Button>
            <div></div>{" "}
            <Button
              variant="outline"
              onClick={() => movePlayer("right")}
              disabled={isRunningAStar || hasWon}
              className="p-3"
            >
              <ArrowRight />
            </Button>
            <div></div>
            <Button
              variant="outline"
              onClick={() => movePlayer("down")}
              disabled={isRunningAStar || hasWon}
              className="p-3"
            >
              <ArrowDown />
            </Button>
            <div></div>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            Use arrow keys or buttons to navigate
          </p>
        </div>
      )}
    </div>
  );
};

export default GameBoard;
