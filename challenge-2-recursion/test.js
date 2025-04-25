const {
  findAllPaths,
  findShortestPath,
  findAllPathsWithDiagonals,
  findAllPathsMemoized,
} = require('./solution');

// Utility function to test common scenarios for path-finding functions
const testFindPathsCommon = (findPathsFunc) => {
  describe(`${findPathsFunc.name} Common Tests`, () => {
    test('should throw error for invalid grid', () => {
      expect(() => findPathsFunc(null)).toThrow('Invalid grid');
      expect(() => findPathsFunc([])).toThrow('Invalid grid');
      expect(() => findPathsFunc([[]])).toThrow('Invalid grid');
    });

    test('should throw error if start or end is blocked', () => {
      const blockedStart = [
        [1, 0],
        [0, 0],
      ];
      const blockedEnd = [
        [0, 0],
        [0, 1],
      ];
      expect(() => findPathsFunc(blockedStart)).toThrow(
        'start or end position is blocked'
      );
      expect(() => findPathsFunc(blockedEnd)).toThrow(
        'start or end position is blocked'
      );
    });
  });
};

describe('Grid Path Finder', () => {
  testFindPathsCommon(findAllPaths);

  test('should handle a single cell grid', () => {
    const grid = [[0]];
    const result = findAllPaths(grid);
    expect(result).toEqual([[[0, 0]]]);
  });

  test('should return no paths for a grid with only obstacles', () => {
    const grid = [
      [1, 1],
      [1, 1],
    ];
    expect(() => findAllPaths(grid)).toThrow(
      'start or end position is blocked'
    );
  });

  test('should find all paths in a simple 2x2 grid', () => {
    const grid = [
      [0, 0],
      [0, 0],
    ];
    const result = findAllPaths(grid);
    expect(result).toHaveLength(2);
    expect(result).toContainEqual([
      [0, 0],
      [0, 1],
      [1, 1],
    ]);
    expect(result).toContainEqual([
      [0, 0],
      [1, 0],
      [1, 1],
    ]);
  });

  test('should find all paths in a 3x3 grid with obstacles', () => {
    const grid = [
      [0, 0, 0],
      [0, 1, 0],
      [0, 0, 0],
    ];
    const result = findAllPaths(grid);
    expect(result).toHaveLength(2);
    expect(result).toContainEqual([
      [0, 0],
      [0, 1],
      [0, 2],
      [1, 2],
      [2, 2],
    ]);
    expect(result).toContainEqual([
      [0, 0],
      [1, 0],
      [2, 0],
      [2, 1],
      [2, 2],
    ]);
  });

  test('should handle a single path scenario', () => {
    const grid = [
      [0, 0, 0],
      [1, 1, 0],
      [1, 1, 0],
    ];
    const result = findAllPaths(grid);
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual([
      [0, 0],
      [0, 1],
      [0, 2],
      [1, 2],
      [2, 2],
    ]);
  });

  test('should handle larger grids', () => {
    const grid = [
      [0, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    const result = findAllPaths(grid);
    expect(result.length).toBeGreaterThan(0);
    result.forEach((path) => {
      expect(path[0]).toEqual([0, 0]);
      expect(path[path.length - 1]).toEqual([3, 3]);
    });
  });
});

describe('Find All Paths With Diagonals', () => {
  testFindPathsCommon(findAllPathsWithDiagonals);

  test('should include diagonal paths in a 2x2 grid', () => {
    const grid = [
      [0, 0],
      [0, 0],
    ];
    const result = findAllPathsWithDiagonals(grid);
    expect(result).toHaveLength(3); // Right->Down, Down->Right, and Diagonal
    expect(result).toContainEqual([
      [0, 0],
      [0, 1],
      [1, 1],
    ]);
    expect(result).toContainEqual([
      [0, 0],
      [1, 0],
      [1, 1],
    ]);
    expect(result).toContainEqual([
      [0, 0],
      [1, 1],
    ]);
  });

  test('should find more paths with diagonals in grid with obstacles', () => {
    const grid = [
      [0, 0, 0],
      [0, 1, 0],
      [0, 0, 0],
    ];
    const result = findAllPathsWithDiagonals(grid);
    // Should include paths that go around obstacle and potentially use diagonals
    expect(result.length).toBeGreaterThan(2); // More than without diagonals
    result.forEach((path) => {
      expect(path[0]).toEqual([0, 0]);
      expect(path[path.length - 1]).toEqual([2, 2]);
    });
  });

  test('should find the direct diagonal path in open grid', () => {
    const grid = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    const result = findAllPathsWithDiagonals(grid);
    expect(result).toContainEqual([
      [0, 0],
      [1, 1],
      [2, 2],
    ]);
  });
});

describe('Find All Paths Memoized', () => {
  testFindPathsCommon(findAllPathsMemoized);

  test('should find all paths in a simple 2x2 grid', () => {
    const grid = [
      [0, 0],
      [0, 0],
    ];
    const result = findAllPathsMemoized(grid);
    expect(result).toHaveLength(2);
    expect(result).toContainEqual([
      [0, 0],
      [0, 1],
      [1, 1],
    ]);
    expect(result).toContainEqual([
      [0, 0],
      [1, 0],
      [1, 1],
    ]);
  });

  test('should find all paths in a 3x3 grid with obstacles', () => {
    const grid = [
      [0, 0, 0],
      [0, 1, 0],
      [0, 0, 0],
    ];
    const result = findAllPathsMemoized(grid);
    expect(result).toHaveLength(2);
    expect(result).toContainEqual([
      [0, 0],
      [0, 1],
      [0, 2],
      [1, 2],
      [2, 2],
    ]);
    expect(result).toContainEqual([
      [0, 0],
      [1, 0],
      [2, 0],
      [2, 1],
      [2, 2],
    ]);
  });

  test('should handle a single path scenario', () => {
    const grid = [
      [0, 0, 0],
      [1, 1, 0],
      [1, 1, 0],
    ];
    const result = findAllPathsMemoized(grid);
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual([
      [0, 0],
      [0, 1],
      [0, 2],
      [1, 2],
      [2, 2],
    ]);
  });

  test('should handle larger grids efficiently', () => {
    const grid = [
      [0, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    const result = findAllPathsMemoized(grid);
    expect(result.length).toBeGreaterThan(0);
    result.forEach((path) => {
      expect(path[0]).toEqual([0, 0]);
      expect(path[path.length - 1]).toEqual([3, 3]);
    });
  });

  test('should match results with non-memoized version', () => {
    const grid = [
      [0, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 0],
    ];

    // Create deep copies of the grid to avoid shared state
    const gridCopy1 = grid.map((row) => [...row]);
    const gridCopy2 = grid.map((row) => [...row]);

    const regularResult = findAllPaths(gridCopy1);
    const memoizedResult = findAllPathsMemoized(gridCopy2);

    expect(memoizedResult.length).toBe(regularResult.length);

    // Check if all paths from one result exist in the other
    regularResult.forEach((path) => {
      const pathExists = memoizedResult.some((mPath) => {
        if (mPath.length !== path.length) return false;
        return path.every(
          (coord, i) => coord[0] === mPath[i][0] && coord[1] === mPath[i][1]
        );
      });
      expect(pathExists).toBe(true);
    });
  });
});

describe('Performance comparison', () => {
  test('memoized version should handle complex grids efficiently', () => {
    // Create a larger grid with some obstacles
    const grid = Array(6)
      .fill()
      .map(() => Array(6).fill(0));
    // Add some obstacles
    grid[1][1] = 1;
    grid[2][3] = 1;
    grid[3][2] = 1;
    grid[4][4] = 1;

    // Create deep copies of the grid
    const gridCopy1 = grid.map((row) => [...row]);
    const gridCopy2 = grid.map((row) => [...row]);

    // Time the execution of both methods
    const startRegular = Date.now();
    const regularResult = findAllPaths(gridCopy1);
    const regularTime = Date.now() - startRegular;

    const startMemoized = Date.now();
    const memoizedResult = findAllPathsMemoized(gridCopy2);
    const memoizedTime = Date.now() - startMemoized;

    // Both methods should find the same number of paths
    expect(memoizedResult.length).toBe(regularResult.length);
  });
});

// Additional tests for the shortest path and diagonal paths and memoization
describe('Find Shortest Path', () => {
  test('should find the shortest path in a 2x2 grid', () => {
    const grid = [
      [0, 0],
      [0, 0],
    ];
    const result = findShortestPath(grid);
    expect(result).toHaveLength(3); // Start -> one move -> end
    expect(result[0]).toEqual([0, 0]);
    expect(result[result.length - 1]).toEqual([1, 1]);
  });

  test('should find shortest path in grid with obstacles', () => {
    const grid = [
      [0, 0, 0],
      [0, 1, 0],
      [0, 0, 0],
    ];
    const result = findShortestPath(grid);
    expect(result).toHaveLength(5); // Both paths are same length
    expect(result[0]).toEqual([0, 0]);
    expect(result[result.length - 1]).toEqual([2, 2]);
  });

  test('should handle grid with only one path', () => {
    const grid = [
      [0, 0, 0],
      [1, 1, 0],
      [0, 0, 0],
    ];
    const result = findShortestPath(grid);
    expect(result).toEqual([
      [0, 0],
      [0, 1],
      [0, 2],
      [1, 2],
      [2, 2],
    ]);
  });

  test('should find shortest among multiple paths', () => {
    const grid = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    const result = findShortestPath(grid);
    expect(result.length).toBe(7); // Either right-right-right-down-down-down or down-down-down-right-right-right
    expect(result[0]).toEqual([0, 0]);
    expect(result[result.length - 1]).toEqual([3, 3]);
  });
});
