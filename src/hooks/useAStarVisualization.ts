import { useState, useCallback } from "react";
import { MazeData, Position } from "@/types/maze";
import { findPath } from "@/utils/a-star-algorithm";
import { toast } from "sonner";

interface UseAStarVisualizationResult {
  isRunningAStar: boolean;
  visitedCells: Position[];
  pathCells: Position[];
  visualizationSpeed: number;
  setVisualizationSpeed: (speed: number) => void;
  runAStar: () => Promise<void>;
  resetVisualization: () => void;
}

export const useAStarVisualization = (
  mazeData: MazeData | null,
  onPathFound: () => void
): UseAStarVisualizationResult => {
  const [isRunningAStar, setIsRunningAStar] = useState<boolean>(false);
  const [visitedCells, setVisitedCells] = useState<Position[]>([]);
  const [pathCells, setPathCells] = useState<Position[]>([]);
  const [visualizationSpeed, setVisualizationSpeed] = useState<number>(100);

  const resetVisualization = useCallback(() => {
    setVisitedCells([]);
    setPathCells([]);
  }, []);

  const runAStar = useCallback(async () => {
    if (!mazeData || isRunningAStar) return;

    setIsRunningAStar(true);
    resetVisualization();

    const result = await findPath(
      mazeData,
      mazeData.start,
      mazeData.end,
      (visited) => {
        setVisitedCells([...visited]);
        return new Promise((resolve) =>
          setTimeout(resolve, visualizationSpeed)
        );
      }
    );

    if (result.path.length > 0) {
      const animatePath = async () => {
        const path = [...result.path];
        const tempPath: Position[] = [];

        for (let i = 0; i < path.length; i++) {
          tempPath.push(path[i]);
          setPathCells([...tempPath]);
          await new Promise((resolve) =>
            setTimeout(resolve, visualizationSpeed)
          );
        }

        onPathFound();
        toast.success(
          `A* Algorithm Completed: Found path with ${result.path.length} steps after exploring ${result.visitedCount} cells.`
        );
      };

      await animatePath();
    } else {
      toast.error(
        "No Path Found: The A* algorithm could not find a path to the exit."
      );
    }

    setIsRunningAStar(false);
  }, [
    mazeData,
    isRunningAStar,
    visualizationSpeed,
    resetVisualization,
    onPathFound,
  ]);

  return {
    isRunningAStar,
    visitedCells,
    pathCells,
    visualizationSpeed,
    setVisualizationSpeed,
    runAStar,
    resetVisualization,
  };
};
