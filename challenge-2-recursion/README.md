# Grid Path Finder Challenge

## Problem Description

Given a 2D grid of size m x n, find all possible paths from the top-left corner (0,0) to the bottom-right corner (m-1,n-1). You can only move right or down at any point in time.

### Input

- A 2D grid represented as an array of arrays
- Each cell in the grid can be either:
  - 0: represents a valid path
  - 1: represents an obstacle that cannot be passed

### Output

- An array of arrays, where each inner array represents a valid path
- Each path is represented as a sequence of coordinates [row, column]
- The path must start at [0,0] and end at [m-1,n-1]

### Example

```javascript
const grid = [
  [0, 0, 0],
  [0, 1, 0],
  [0, 0, 0],
];

// Expected output:
[
  [
    [0, 0],
    [0, 1],
    [0, 2],
    [1, 2],
    [2, 2],
  ],
  [
    [0, 0],
    [1, 0],
    [2, 0],
    [2, 1],
    [2, 2],
  ],
];
```

### Constraints

- 1 <= m, n <= 10
- The grid will always have at least one valid path
- The start and end positions will always be valid (0)

### Requirements

- Implement the solution using recursion
- Handle edge cases appropriately
- Optimize the solution to avoid unnecessary computations
- Include proper error handling

### Bonus

- Implement a solution that finds the shortest path
- Add support for diagonal moves
- Implement memoization to optimize the solution


# MY APPROACH

## Main Solution: `findAllPaths()`
I used a **backtracking approach** to find all possible paths from the top-left to the bottom-right corner of the grid:

- **Grid Check**: First, I make sure the grid is valid and that the start and end points are not blocked.
- **Recursive Exploration**: I created a function that:
  - Checks if we're out of bounds, on a blocked cell, or reached the destination.
  - Keeps track of the current path using a list of coordinates.
  - Marks cells as visited so we don't go back and forth on the same path.
  - Explores two possible directions: right and down (I added diagonal moves in the extended solution).
  - When backtracking, it undoes the last step.

The function collects all valid paths and returns them in a list.

## Bonus Features

### Finding the Shortest Path: `findShortestPath()`
This function first finds all paths using `findAllPaths()`, then picks the shortest path by comparing their lengths. The shortest path is the one with the least number of steps.

### Adding Diagonal Moves: `findAllPathsWithDiagonals()`
In this version, I added an extra move to go diagonally down-right. This means the function checks right, down, and diagonal directions to explore more possible paths.

### Using Memoization: `findAllPathsMemoized()`
To make the solution faster, I added **memoization** using a **Map**. This stores already calculated paths for each cell. So if we visit a cell again, the function uses the stored result instead of calculating it again.

## Error Handling
The solution checks for errors in these cases:
- **Empty grids**: If the grid is empty or doesn’t have valid rows or columns, an error is thrown.
- **Invalid grids**: It checks that the start and end points are not blocked. If they are, it throws an error.
- **Blocked or out-of-bounds cells**: The solution ensures no invalid moves are made during the pathfinding.

This solution works well for finding all paths or the shortest path, depending on the need. The backtracking method is good for exploring all possible routes when every option needs to be considered.

## Running Tests

To run the tests for Challenge 2 only, use the following command:

```bash
npx jest challenge-2-recursion/test.js
```
