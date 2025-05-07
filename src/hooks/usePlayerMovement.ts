import { useState, useEffect, useCallback } from "react";
import { MazeData, Position } from "@/types/maze";
import { toast } from "sonner";
import {
  Direction,
  isValidPosition,
  calculateNewPosition,
  hasReachedEnd,
  getArrowKeyDirection,
  formatWinMessage,
} from "@/utils/maze-helpers";

interface UsePlayerMovementResult {
  playerPosition: Position | null;
  playerPath: Position[];
  movePlayer: (direction: Direction) => void;
  resetPlayer: (startPosition: Position) => void;
}

export const usePlayerMovement = (
  mazeData: MazeData | null,
  mazeSize: number,
  isManualMode: boolean,
  optimalPathLength: number | null,
  onWin?: () => void
): UsePlayerMovementResult => {
  const [playerPosition, setPlayerPosition] = useState<Position | null>(null);
  const [playerPath, setPlayerPath] = useState<Position[]>([]);

  const resetPlayer = useCallback((startPosition: Position) => {
    setPlayerPosition(startPosition);
    setPlayerPath([startPosition]);
  }, []);

  const movePlayer = useCallback(
    (direction: Direction) => {
      if (!playerPosition || !mazeData || !isManualMode) return;

      const newPosition = calculateNewPosition(playerPosition, direction);

      if (isValidPosition(newPosition, mazeData, mazeSize)) {
        setPlayerPosition(newPosition);
        setPlayerPath((prev) => [...prev, newPosition]);

        if (hasReachedEnd(newPosition, mazeData.end)) {
          if (onWin) onWin();

          if (optimalPathLength !== null) {
            const userPathLength = playerPath.length + 1;
            toast.success(formatWinMessage(userPathLength, optimalPathLength));
          }
        }
      }
    },
    [
      playerPosition,
      mazeData,
      isManualMode,
      mazeSize,
      playerPath,
      optimalPathLength,
      onWin,
    ]
  );

  useEffect(() => {
    if (!isManualMode || !mazeData) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!playerPosition) return;

      const direction = getArrowKeyDirection(e.key);
      if (direction) {
        movePlayer(direction);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isManualMode, playerPosition, mazeData, movePlayer]);

  return {
    playerPosition,
    playerPath,
    movePlayer,
    resetPlayer,
  };
};
