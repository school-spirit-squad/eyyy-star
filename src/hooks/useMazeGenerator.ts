import { useState, useEffect, useCallback } from "react";
import { MazeData, Position } from "@/types/maze";
import { generateMaze } from "@/utils/maze-generator";
import { findPath } from "@/utils/a-star-algorithm";

interface UseMazeGeneratorResult {
  mazeData: MazeData | null;
  mazeSize: number;
  setMazeSize: (size: number) => void;
  initializeMaze: () => void;
  optimalPathLength: number | null;
  optimalPath: Position[] | null;
}

export const useMazeGenerator = (
  initialSize: number = 10
): UseMazeGeneratorResult => {
  const [mazeSize, setMazeSize] = useState<number>(initialSize);
  const [mazeData, setMazeData] = useState<MazeData | null>(null);
  const [optimalPathLength, setOptimalPathLength] = useState<number | null>(
    null
  );
  const [optimalPath, setOptimalPath] = useState<Position[] | null>(null);

  const initializeMaze = useCallback(() => {
    const newMaze = generateMaze(mazeSize);
    setMazeData(newMaze);

    findPath(newMaze, newMaze.start, newMaze.end).then((result) => {
      setOptimalPathLength(result.path.length);
      setOptimalPath(result.path);
    });

    return newMaze;
  }, [mazeSize]);

  useEffect(() => {
    initializeMaze();
  }, [mazeSize, initializeMaze]);

  return {
    mazeData,
    mazeSize,
    setMazeSize,
    initializeMaze,
    optimalPathLength,
    optimalPath,
  };
};
