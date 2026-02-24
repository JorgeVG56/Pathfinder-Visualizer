# Pathfinder-Visualizer
A small p5 application I made for my Artificial Intelligence class

To use you must select one of the four Search Algorithms:
- DFS: Explores one path as deep as possible before backtracking. It does not guarantee the shortest path.
- BFS: Explores level by level. It guarantees the shortest path in unweighted graphs.
- Dijkstra: Expands the node with the smallest distance from the start. It guarantees the shortest path with weighted costs.
- A*: Uses distance from the start plus a heuristic to the goal. It guarantees the shortest path (with a good heuristic) and is usually faster.

Also you need to have a start and end in the grid. 
You can paint the grid using the selector and **Left-click**. There are four types of cells:
- Start: The start of the search algorithm.
- End: The goal the algorithm want to reach.
- Wall: A cell you cannot go trought
- Mud: A slower cell than empty cell. Its used for Dijkstra and A*.

If you missplace a cell you can erase it using **Right-Click**.

If you are choosing the A* algorithm, there are three heuristic calculation (dx = abs(x1 - x2), dy = abs(y1 - y2)):
- Manhattan: (dx + dy) * 10
- Diagonal: min(dx, dy) * 14 + abs(dx - dy) * 10
- Euclidian: sqrt(dx² + dy²)

To start the search, press the start button and a animation will start. If you want to see step by step, check the **Step by Step** option and press the **Next Step** button. Uncheck the **Step by Step** box and press **Next Step** to go back to normal animation.

**Why A* checks fewer cells than BFS**
BFS explores evenly in all directions. A* uses a heuristic to move toward the goal, so it avoids exploring unnecessary cells.
