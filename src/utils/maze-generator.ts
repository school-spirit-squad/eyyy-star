import { Cell, MazeData, Position } from "@/types/maze";

const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const initializeGrid = (size: number): Cell[][] => {
  const grid: Cell[][] = [];
  for (let y = 0; y < size; y++) {
    const row: Cell[] = [];
    for (let x = 0; x < size; x++) {
      row.push({ isWall: true });
    }
    grid.push(row);
  }
  return grid;
};

const createStartAndEnd = (
  size: number
): { start: Position; end: Position } => {
  const startBorder = getRandomInt(0, 3);
  let endBorder = getRandomInt(0, 3);

  while (endBorder === startBorder) {
    endBorder = getRandomInt(0, 3);
  }

  const start: Position = { x: 0, y: 0 };
  const end: Position = { x: 0, y: 0 };

  switch (startBorder) {
    case 0:
      start.x = getRandomInt(1, size - 2);
      start.y = 0;
      break;
    case 1:
      start.x = size - 1;
      start.y = getRandomInt(1, size - 2);
      break;
    case 2:
      start.x = getRandomInt(1, size - 2);
      start.y = size - 1;
      break;
    case 3:
      start.x = 0;
      start.y = getRandomInt(1, size - 2);
      break;
  }

  switch (endBorder) {
    case 0:
      end.x = getRandomInt(1, size - 2);
      end.y = 0;
      break;
    case 1:
      end.x = size - 1;
      end.y = getRandomInt(1, size - 2);
      break;
    case 2:
      end.x = getRandomInt(1, size - 2);
      end.y = size - 1;
      break;
    case 3:
      end.x = 0;
      end.y = getRandomInt(1, size - 2);
      break;
  }

  return { start, end };
};

export const generateMaze = (size: number): MazeData => {
  const grid = initializeGrid(size);
  const { start, end } = createStartAndEnd(size);

  grid[start.y][start.x].isWall = false;
  grid[end.y][end.x].isWall = false;

  const directions = [
    { x: 0, y: -2 },
    { x: 2, y: 0 },
    { x: 0, y: 2 },
    { x: -2, y: 0 },
  ];

  const isInBounds = (x: number, y: number): boolean => {
    return x >= 0 && x < size && y >= 0 && y < size;
  };

  const carvePath = (x: number, y: number) => {
    grid[y][x].isWall = false;

    const shuffledDirections = [...directions].sort(() => Math.random() - 0.5);

    for (const dir of shuffledDirections) {
      const newX = x + dir.x;
      const newY = y + dir.y;

      if (isInBounds(newX, newY) && grid[newY][newX].isWall) {
        grid[y + dir.y / 2][x + dir.x / 2].isWall = false;
        carvePath(newX, newY);
      }
    }
  };

  const startX = getRandomInt(1, Math.floor(size / 2) - 1) * 2 - 1;
  const startY = getRandomInt(1, Math.floor(size / 2) - 1) * 2 - 1;

  carvePath(startX, startY);

  if (start.x === 0) {
    grid[start.y][start.x + 1].isWall = false;
  } else if (start.x === size - 1) {
    grid[start.y][start.x - 1].isWall = false;
  } else if (start.y === 0) {
    grid[start.y + 1][start.x].isWall = false;
  } else if (start.y === size - 1) {
    grid[start.y - 1][start.x].isWall = false;
  }

  if (end.x === 0) {
    grid[end.y][end.x + 1].isWall = false;
  } else if (end.x === size - 1) {
    grid[end.y][end.x - 1].isWall = false;
  } else if (end.y === 0) {
    grid[end.y + 1][end.x].isWall = false;
  } else if (end.y === size - 1) {
    grid[end.y - 1][end.x].isWall = false;
  }

  const numWallsToRemove = Math.floor(size * size * 0.05);
  let wallsRemoved = 0;

  while (wallsRemoved < numWallsToRemove) {
    const x = getRandomInt(1, size - 2);
    const y = getRandomInt(1, size - 2);

    if (grid[y][x].isWall) {
      let adjacentPaths = 0;
      if (!grid[y - 1][x].isWall) adjacentPaths++;
      if (!grid[y + 1][x].isWall) adjacentPaths++;
      if (!grid[y][x - 1].isWall) adjacentPaths++;
      if (!grid[y][x + 1].isWall) adjacentPaths++;

      if (adjacentPaths <= 2) {
        grid[y][x].isWall = false;
        wallsRemoved++;
      }
    }
  }

  return { grid, start, end };
};
