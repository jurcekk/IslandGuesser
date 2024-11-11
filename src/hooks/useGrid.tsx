import { useState, useEffect } from 'react';
import axios from 'axios';
import { Cell, GridData, Island, Matrix } from '../types/grid';

const exploreIsland = (
  matrix: Matrix,
  visited: boolean[][],
  startRow: number,
  startCol: number,
  islandCells: Cell[]
) => {
  // DFS algorithm to explore the island, and find all connected cells
  const stack: [number, number][] = [];
  stack.push([startRow, startCol]);

  while (stack.length > 0) {
    const [currentRow, currentCol] = stack.pop()!;
    // Check if the current cell is valid and is not visited or has a value of 0
    if (
      currentRow < 0 ||
      currentRow >= matrix.length ||
      currentCol < 0 ||
      currentCol >= matrix[0].length
    ) {
      continue;
    }
    if (visited[currentRow][currentCol]) {
      continue;
    }
    if (matrix[currentRow][currentCol] === 0) {
      continue;
    }

    visited[currentRow][currentCol] = true;
    islandCells.push({ row: currentRow, col: currentCol });

    stack.push([currentRow - 1, currentCol]);
    stack.push([currentRow + 1, currentCol]);
    stack.push([currentRow, currentCol - 1]);
    stack.push([currentRow, currentCol + 1]);
  }
};

const parseMatrixWithIslands = (
  data: string
): {
  matrix: Matrix;
  islands: Island[];
} => {
  const rows = data.trim().split('\n');
  // Convert row string data to array of numbers
  const matrix: Matrix = rows.map((row) =>
    row
      .trim()
      .split(' ')
      .map((numStr) => parseInt(numStr, 10))
  );

  // Make a visited matrix to keep track of visited cells
  const visited: boolean[][] = Array.from({ length: matrix.length }, () =>
    Array(matrix[0].length).fill(false)
  );

  const islands: Island[] = [];

  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[0].length; col++) {
      if (!visited[row][col] && matrix[row][col] !== 0) {
        // Start a new island
        const islandCells: Cell[] = [];
        // Explore the island to find all cells that belong to an island
        exploreIsland(matrix, visited, row, col, islandCells);

        // Calculate the average height of the island by summing all the heights and dividing by the number of cells
        const averageHeight =
          islandCells.reduce((acc, cell) => acc + matrix[cell.row][cell.col], 0) /
          islandCells.length;

        islands.push({
          cells: islandCells,
          averageHeight,
        });
      }
    }
  }

  return { matrix, islands };
};

const useGrid = () => {
  // Initial state
  const [grid, setGrid] = useState<GridData>({
    matrix: [],
    islands: [],
  });

  useEffect(() => {
    // Fetch grid data
    const getGridData = async () => {
      try {
        const response = await axios.get(
          'https://jobfair.nordeus.com/jf24-fullstack-challenge/test'
        );
        const parsedData = parseMatrixWithIslands(response.data);
        setGrid({
          matrix: parsedData.matrix,
          islands: parsedData.islands,
        });
      } catch (error) {
        console.error('Error fetching grid data:', error);
      }
    };

    getGridData();
  }, []);

  return grid;
};

export default useGrid;
