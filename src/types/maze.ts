export interface Position {
  x: number;
  y: number;
}

export interface Cell {
  isWall: boolean;
  isVisited?: boolean;
}

export interface MazeData {
  grid: Cell[][];
  start: Position;
  end: Position;
}

export interface AStarNode {
  position: Position;
  gScore: number;
  fScore: number;
  parent: AStarNode | null;
}

export interface PathResult {
  path: Position[];
  visitedCount: number;
}
