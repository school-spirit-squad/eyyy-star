import { MazeData, Position, PathResult } from "../types/maze";

const calculateHeuristic = (a: Position, b: Position): number => {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
};

const positionsEqual = (a: Position, b: Position): boolean => {
  return a.x === b.x && a.y === b.y;
};

const getNeighbors = (position: Position, mazeData: MazeData): Position[] => {
  const { grid } = mazeData;
  const size = grid.length;
  const { x, y } = position;
  const neighbors: Position[] = [];

  const directions = [
    { x: 0, y: -1 },
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: -1, y: 0 },
  ];

  for (const dir of directions) {
    const newX = x + dir.x;
    const newY = y + dir.y;

    if (
      newX >= 0 &&
      newX < size &&
      newY >= 0 &&
      newY < size &&
      !grid[newY][newX].isWall
    ) {
      neighbors.push({ x: newX, y: newY });
    }
  }

  return neighbors;
};

const findLowestFScore = (
  openSet: Position[],
  fScore: Map<string, number>
): Position => {
  let lowestPosition = openSet[0];
  let lowestValue =
    fScore.get(`${lowestPosition.x},${lowestPosition.y}`) || Infinity;

  for (let i = 1; i < openSet.length; i++) {
    const position = openSet[i];
    const value = fScore.get(`${position.x},${position.y}`) || Infinity;

    if (value < lowestValue) {
      lowestValue = value;
      lowestPosition = position;
    }
  }

  return lowestPosition;
};

const reconstructPath = (
  cameFrom: Map<string, Position>,
  current: Position
): Position[] => {
  const path: Position[] = [current];

  while (cameFrom.has(`${current.x},${current.y}`)) {
    current = cameFrom.get(`${current.x},${current.y}`)!;
    path.unshift(current);
  }

  return path;
};

export const findPath = async (
  mazeData: MazeData,
  start: Position,
  goal: Position,
  onVisitCallback?: (visited: Position[]) => Promise<void>
): Promise<PathResult> => {
  const openSet: Position[] = [start];
  const closedSet: Position[] = [];

  const gScore = new Map<string, number>();
  const fScore = new Map<string, number>();
  const cameFrom = new Map<string, Position>();

  gScore.set(`${start.x},${start.y}`, 0);
  fScore.set(`${start.x},${start.y}`, calculateHeuristic(start, goal));

  while (openSet.length > 0) {
    const current = findLowestFScore(openSet, fScore);

    if (positionsEqual(current, goal)) {
      return {
        path: reconstructPath(cameFrom, current),
        visitedCount: closedSet.length,
      };
    }

    openSet.splice(
      openSet.findIndex((pos) => pos.x === current.x && pos.y === current.y),
      1
    );
    closedSet.push(current);

    if (onVisitCallback) {
      await onVisitCallback([...closedSet]);
    }

    const neighbors = getNeighbors(current, mazeData);

    for (const neighbor of neighbors) {
      if (
        closedSet.some((pos) => pos.x === neighbor.x && pos.y === neighbor.y)
      ) {
        continue;
      }

      const tentativeGScore =
        (gScore.get(`${current.x},${current.y}`) || Infinity) + 1;

      if (
        tentativeGScore >=
          (gScore.get(`${neighbor.x},${neighbor.y}`) || Infinity) &&
        openSet.some((pos) => pos.x === neighbor.x && pos.y === neighbor.y)
      ) {
        continue;
      }

      cameFrom.set(`${neighbor.x},${neighbor.y}`, current);
      gScore.set(`${neighbor.x},${neighbor.y}`, tentativeGScore);
      fScore.set(
        `${neighbor.x},${neighbor.y}`,
        tentativeGScore + calculateHeuristic(neighbor, goal)
      );

      if (
        !openSet.some((pos) => pos.x === neighbor.x && pos.y === neighbor.y)
      ) {
        openSet.push(neighbor);
      }
    }
  }

  return {
    path: [],
    visitedCount: closedSet.length,
  };
};
