# Maze Solver with A* Algorithm

A React-based interactive maze solver application that demonstrates pathfinding using the A* algorithm. This application allows users to explore maze navigation both manually and through automated pathfinding.

## About the Project

This application demonstrates maze generation and pathfinding algorithms in an interactive way. Users can:

- Generate random mazes of different sizes
- Navigate through the maze manually using arrow keys or on-screen controls
- Watch as the A* algorithm finds the optimal path from start to end
- Adjust visualization speed to better understand how the algorithm works
- Compare their manual solution with the optimal path found by the algorithm

## What is A* Algorithm?

A* (pronounced "A-star") is a popular pathfinding algorithm used in computer science and artificial intelligence. It was first described by Peter Hart, Nils Nilsson, and Bertram Raphael in 1968. A* is widely used in graph traversal and pathfinding problems, such as finding the shortest path between two points on a map or in a game environment.

### How A* Works

A* combines the advantages of two other popular algorithms:
- **Dijkstra's Algorithm**: which guarantees finding the shortest path
- **Greedy Best-First-Search**: which uses heuristics to speed up the search

A* uses a combination of:
1. **g(n)**: The cost of the path from the start node to node n
2. **h(n)**: A heuristic that estimates the cost of the cheapest path from n to the goal
3. **f(n)**: The sum of g(n) and h(n), representing the estimated total cost of the path through n to the goal

For each node, A* maintains these values and explores the nodes with the lowest f(n) value first. This approach ensures that A* will find the optimal path (like Dijkstra's) while exploring fewer nodes (like Greedy Best-First-Search).

### Key Features of A*

- **Optimality**: A* finds the shortest path if the heuristic is admissible (never overestimates)
- **Completeness**: A* will always find a path if one exists
- **Efficiency**: A* typically explores fewer nodes than other pathfinding algorithms
- **Versatility**: Works on various types of graphs and grid-based maps

## Tech Stack

- React with TypeScript
- Vite for fast development and building
- Tailwind CSS for styling
- shadcn/ui component library

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone the repository
  ```
  https://github.com/RobBaban12/Astar.git
  ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```

## Features

- **Interactive Maze Grid**: Visually displays the maze with clear indicators for walls, start, end, and pathfinding progress
- **Manual Navigation**: Control movement using arrow keys or on-screen buttons
- **A* Visualization**: Watch the algorithm explore the maze and find the optimal path
- **Customizable Settings**: Adjust maze size and visualization speed
- **Performance Comparison**: Compare your manual solution with the algorithm's solution

