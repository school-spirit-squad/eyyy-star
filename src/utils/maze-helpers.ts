import { MazeData, Position } from "@/types/maze";

export type Direction = "up" | "down" | "left" | "right";

export const isValidPosition = (
  position: Position,
  mazeData: MazeData,
  mazeSize: number
): boolean => {
  return (
    position.x >= 0 &&
    position.x < mazeSize &&
    position.y >= 0 &&
    position.y < mazeSize &&
    !mazeData.grid[position.y][position.x].isWall
  );
};

export const calculateNewPosition = (
  currentPosition: Position,
  direction: Direction
): Position => {
  const newPosition = { ...currentPosition };

  switch (direction) {
    case "up":
      newPosition.y = currentPosition.y - 1;
      break;
    case "down":
      newPosition.y = currentPosition.y + 1;
      break;
    case "left":
      newPosition.x = currentPosition.x - 1;
      break;
    case "right":
      newPosition.x = currentPosition.x + 1;
      break;
  }

  return newPosition;
};

export const hasReachedEnd = (
  position: Position,
  endPosition: Position
): boolean => {
  return position.x === endPosition.x && position.y === endPosition.y;
};

export const getArrowKeyDirection = (key: string): Direction | null => {
  switch (key) {
    case "ArrowUp":
      return "up";
    case "ArrowDown":
      return "down";
    case "ArrowLeft":
      return "left";
    case "ArrowRight":
      return "right";
    default:
      return null;
  }
};

export const formatWinMessage = (
  userPathLength: number,
  optimalPathLength: number | null
): string => {
  if (optimalPathLength === null) {
    return `You solved the maze in ${userPathLength} steps!`;
  }

  if (userPathLength === optimalPathLength) {
    return `You found the optimal path in ${userPathLength} steps!`;
  } else {
    return `You solved the maze in ${userPathLength} steps, but the optimal path is ${optimalPathLength} steps.`;
  }
};
