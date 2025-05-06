import React from "react";
import { MazeData, Position } from "@/types/maze";
import { cn } from "@/lib/utils";

interface MazeGridProps {
  mazeData: MazeData;
  playerPosition: Position | null;
  visitedCells: Position[];
  pathCells: Position[];
  hasWon: boolean;
}

const MazeGrid: React.FC<MazeGridProps> = ({
  mazeData,
  playerPosition,
  visitedCells,
  pathCells,
  hasWon,
}) => {
  const { grid, start, end } = mazeData;
  const size = grid.length;

  const cellSize = Math.min(Math.floor(500 / size), 30);

  const isVisited = (x: number, y: number) => {
    return visitedCells.some((pos) => pos.x === x && pos.y === y);
  };

  const isPath = (x: number, y: number) => {
    return pathCells.some((pos) => pos.x === x && pos.y === y);
  };

  const isPlayer = (x: number, y: number) => {
    return playerPosition?.x === x && playerPosition?.y === y;
  };

  const isStart = (x: number, y: number) => {
    return start.x === x && start.y === y;
  };

  const isEnd = (x: number, y: number) => {
    return end.x === x && end.y === y;
  };

  return (
    <div
      className="border-4 border-blue-900 rounded-lg overflow-hidden bg-white shadow-xl"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${size}, ${cellSize}px)`,
        gridTemplateRows: `repeat(${size}, ${cellSize}px)`,
        gap: "1px",
        padding: "1px",
      }}
    >
      {grid.map((row, y) =>
        row.map((cell, x) => {
          const isPlayerCell = isPlayer(x, y);
          const isStartCell = isStart(x, y);
          const isEndCell = isEnd(x, y);
          const isVisitedCell = isVisited(x, y);
          const isPathCell = isPath(x, y);

          return (
            <div
              key={`${x}-${y}`}
              className={cn(
                "transition-all duration-200 relative",
                cell.isWall
                  ? "bg-blue-900"
                  : isPlayerCell && isEndCell && hasWon
                  ? "bg-green-400"
                  : isStartCell
                  ? "bg-green-500"
                  : isEndCell
                  ? "bg-red-500"
                  : isPlayerCell
                  ? "bg-yellow-400"
                  : isPathCell
                  ? "bg-yellow-300"
                  : isVisitedCell
                  ? "bg-purple-200"
                  : "bg-blue-50"
              )}
              style={{
                width: `${cellSize}px`,
                height: `${cellSize}px`,
              }}
            >
              {isStartCell && (
                <div
                  className="absolute inset-0 flex items-center justify-center text-white font-bold"
                  style={{ fontSize: `${Math.max(cellSize / 2, 10)}px` }}
                >
                  S
                </div>
              )}
              {isEndCell && (
                <div
                  className="absolute inset-0 flex items-center justify-center text-white font-bold"
                  style={{ fontSize: `${Math.max(cellSize / 2, 10)}px` }}
                >
                  E
                </div>
              )}
              {isPlayerCell && !isStartCell && !isEndCell && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-2/3 h-2/3 bg-blue-600 rounded-full" />
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default MazeGrid;
