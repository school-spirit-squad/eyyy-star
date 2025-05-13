import React from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface ControlPanelProps {
  mazeSize: number;
  setMazeSize: (size: number) => void;
  isManualMode: boolean;
  setIsManualMode: (isManual: boolean) => void;
  initializeMaze: () => void;
  runAStar: () => void;
  isRunningAStar: boolean;
  visualizationSpeed: number;
  setVisualizationSpeed: (speed: number) => void;
  hasWon: boolean;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  mazeSize,
  setMazeSize,
  isManualMode,
  setIsManualMode,
  initializeMaze,
  runAStar,
  isRunningAStar,
  visualizationSpeed,
  setVisualizationSpeed,
  hasWon,
}) => {
  return (
    <div className="lg:w-1/4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Maze Controls</CardTitle>
          <CardDescription>
            Configure and control the maze solver
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="mode-switch">Solving Mode</Label>
              <div className="flex items-center space-x-2">
                <Label
                  htmlFor="mode-switch"
                  className={isManualMode ? "font-semibold" : ""}
                >
                  Manual
                </Label>
                <Switch
                  id="mode-switch"
                  checked={!isManualMode}
                  onCheckedChange={(checked) => setIsManualMode(!checked)}
                  disabled={isRunningAStar}
                />
                <Label
                  htmlFor="mode-switch"
                  className={!isManualMode ? "font-semibold" : ""}
                >
                  A* Algorithm
                </Label>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              {isManualMode
                ? "Navigate the maze using arrow keys or direction buttons"
                : "Watch the A* algorithm find the shortest path"}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="maze-size">Maze Size</Label>
            <Select
              value={mazeSize.toString()}
              onValueChange={(value) => setMazeSize(parseInt(value))}
              disabled={isRunningAStar}
            >
              <SelectTrigger id="maze-size" className="w-full">
                <SelectValue placeholder="Select maze size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">Small (10 x 10)</SelectItem>
                <SelectItem value="15">Medium (15 x 15)</SelectItem>
                <SelectItem value="20">Large (20 x 20)</SelectItem>
                <SelectItem value="25">Extra Large (25 x 25)</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-gray-500">
              Larger mazes are more challenging to solve
            </p>
          </div>

          {!isManualMode && (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="visualization-speed">Visualization Speed</Label>
                <Badge variant="outline">
                  {visualizationSpeed === 10
                    ? "Fast"
                    : visualizationSpeed === 300
                    ? "Slow"
                    : "Medium"}
                </Badge>
              </div>
              <Slider
                id="visualization-speed"
                min={10}
                max={300}
                step={10}
                value={[visualizationSpeed]}
                onValueChange={(value) => setVisualizationSpeed(value[0])}
                disabled={isRunningAStar}
                className="py-2"
              />
              <p className="text-sm text-gray-500">
                Adjust how quickly the A* algorithm visualization runs
              </p>
            </div>
          )}

          <div className="space-y-3 pt-2">
            <Button
              onClick={initializeMaze}
              className="w-full"
              variant="outline"
              disabled={isRunningAStar}
            >
              Generate New Maze
            </Button>

            {!isManualMode && (
              <Button
                onClick={runAStar}
                className="w-full"
                variant="black"
                disabled={isRunningAStar || hasWon}
              >
                {isRunningAStar ? "Running A*..." : "Run A* Algorithm"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Legend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-500 mr-2"></div>
              <span>Start Position</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-red-500 mr-2"></div>
              <span>End Position</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-blue-900 mr-2"></div>
              <span>Wall</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-yellow-400 mr-2"></div>
              <span>Current Position</span>
            </div>
            {!isManualMode && (
              <>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-purple-200 mr-2"></div>
                  <span>Visited by A*</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-yellow-300 mr-2"></div>
                  <span>Shortest Path</span>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How to Play</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>Navigate from the green start (S) to the red end (E)</li>
            {isManualMode ? (
              <li>Use arrow keys or direction buttons to move</li>
            ) : (
              <li>Press "Run A* Algorithm" to find the optimal path</li>
            )}
            <li>Generate a new maze at any time</li>
            <li>Try different maze sizes for more challenge</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default ControlPanel;
