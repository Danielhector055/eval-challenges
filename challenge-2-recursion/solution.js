/**
 * Finds all possible paths from top-left to bottom-right in a grid
 * @param {number[][]} grid - 2D grid where 0 represents a valid path and 1 represents an obstacle
 * @returns {number[][][]} - Array of all possible paths, where each path is an array of coordinates
 * @throws {Error} - If grid is invalid or empty
 */
function findAllPaths(grid) {
  validateGrid(grid);

  const rowCount = grid.length;
  const colCount = grid[0].length;
  const allPaths = [];

  function explorePaths(currentRow, currentCol, currentPath) {
    if (isOutOfBoundsOrBlocked(grid, currentRow, currentCol)) return;

    currentPath.push([currentRow, currentCol]);

    if (currentRow === rowCount - 1 && currentCol === colCount - 1) {
      allPaths.push([...currentPath]);
      currentPath.pop();
      return;
    }

    grid[currentRow][currentCol] = 1;
    explorePaths(currentRow, currentCol + 1, currentPath);
    explorePaths(currentRow + 1, currentCol, currentPath);
    grid[currentRow][currentCol] = 0;

    currentPath.pop();
  }

  explorePaths(0, 0, []);
  return allPaths;
}

// shortest path finder from top-left to bottom-right in a grid
function findShortestPath(grid) {
  const allPaths = findAllPaths(grid);

  let shortestPath = allPaths[0];

  for (let i = 1; i < allPaths.length; i++) {
    const currentPath = allPaths[i];
    if (currentPath.length < shortestPath.length) {
      shortestPath = currentPath; // Update shortestPath if the current one is shorter
    }
  }

  return shortestPath;
}

// all possible paths finder including diagonal moves in a grid
function findAllPathsWithDiagonals(grid) {
  validateGrid(grid);

  const rowCount = grid.length;
  const colCount = grid[0].length;
  const allPaths = [];

  function explorePaths(currentRow, currentCol, currentPath) {
    if (isOutOfBoundsOrBlocked(grid, currentRow, currentCol)) return;

    currentPath.push([currentRow, currentCol]);

    if (currentRow === rowCount - 1 && currentCol === colCount - 1) {
      allPaths.push([...currentPath]);
    } else {
      grid[currentRow][currentCol] = 1; //  mark as visited
      explorePaths(currentRow, currentCol + 1, currentPath); // right
      explorePaths(currentRow + 1, currentCol, currentPath); // down
      explorePaths(currentRow + 1, currentCol + 1, currentPath); // diagonal
      grid[currentRow][currentCol] = 0;
    }

    currentPath.pop();
  }

  explorePaths(0, 0, []);
  return allPaths;
}

// all possible paths finder using memoization for optimization
function findAllPathsMemoized(grid) {
  validateGrid(grid);

  const rowCount = grid.length;
  const colCount = grid[0].length;
  const memoizedPaths = new Map();

  function explorePaths(currentRow, currentCol) {
    if (isOutOfBoundsOrBlocked(grid, currentRow, currentCol)) return [];

    const memoKey = `${currentRow},${currentCol}`;
    if (memoizedPaths.has(memoKey)) return memoizedPaths.get(memoKey);

    if (currentRow === rowCount - 1 && currentCol === colCount - 1)
      return [[[currentRow, currentCol]]];

    grid[currentRow][currentCol] = 1;
    const pathsFromCurrentCell = [];

    for (const [rowOffset, colOffset] of [
      [0, 1],
      [1, 0],
    ]) {
      const nextPaths = explorePaths(
        currentRow + rowOffset,
        currentCol + colOffset
      );
      for (const nextPath of nextPaths) {
        pathsFromCurrentCell.push([[currentRow, currentCol], ...nextPath]);
      }
    }

    grid[currentRow][currentCol] = 0;
    memoizedPaths.set(memoKey, pathsFromCurrentCell);

    return pathsFromCurrentCell;
  }

  return explorePaths(0, 0);
}

// grid Validator
function validateGrid(grid) {
  if (!grid || grid.length === 0 || grid[0].length === 0) {
    throw new Error('Invalid grid: grid must be non-empty');
  }

  if (grid[0][0] === 1 || grid[grid.length - 1][grid[0].length - 1] === 1) {
    throw new Error('Invalid grid: start or end position is blocked');
  }
}

// checks if a cell is out of bounds or blocked
function isOutOfBoundsOrBlocked(grid, row, col) {
  return (
    row < 0 ||
    col < 0 ||
    row >= grid.length ||
    col >= grid[0].length ||
    grid[row][col] === 1
  );
}

module.exports = {
  findAllPaths,
  findShortestPath,
  findAllPathsWithDiagonals,
  findAllPathsMemoized,
};
