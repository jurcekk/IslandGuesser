import axios from 'axios';
import { useEffect, useState } from 'react';
import { Cell, GridData, Island, Matrix } from '../../types/grid';

export default function Grid() {
  const [grid, setGrid] = useState<GridData>({
    matrix: [],
    islands: [],
  });

  const exploreIsland = (
    matrix: Matrix,
    visited: boolean[][],
    startRow: number,
    startCol: number,
    islandCells: Cell[]
  ) => {
    const stack: [number, number][] = [];
    stack.push([startRow, startCol]);

    while (stack.length > 0) {
      const [currentRow, currentCol] = stack.pop()!;
      // Check if the current cell is valid and is not visited or has a value of 0
      if (
        currentRow < 0 ||
        currentRow >= matrix[0].length ||
        currentCol < 0 ||
        currentCol >= matrix.length
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
    const matrix: Matrix = [];

    rows.forEach((row) => {
      // Convert row string data to array of numbers
      const rowData = row
        .trim()
        .split(' ')
        .map((numStr) => parseInt(numStr, 10));

      matrix.push(rowData);
    });
    // Make a visited matrix to keep track of visited cells
    const visited: boolean[][] = [];
    for (let i = 0; i < 30; i++) {
      visited.push(new Array(30).fill(false));
    }

    const islands: Island[] = [];

    for (let row = 0; row < matrix[0].length; row++) {
      for (let col = 0; col < matrix.length; col++) {
        if (!visited[row][col] && matrix[row][col] !== 0) {
          // Start a new island
          const islandCells: Cell[] = [];
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

  const getGridData = async () => {
    const data = await axios.request({
      method: 'GET',
      url: 'https://jobfair.nordeus.com/jf24-fullstack-challenge/test',
    });

    const grid = data.data;
    const matrix = parseMatrixWithIslands(grid);

    setGrid({
      matrix: matrix.matrix,
      islands: matrix.islands,
    });
  };

  useEffect(() => {
    getGridData();
  }, []);

  return (
    <div className="grid grid-cols-30">
      {grid?.matrix.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`h-4 w-4 hover:scale-75 ${cell === 0 ? 'bg-blue-400' : 'bg-orange-800'}`}
            onClick={() => console.log(rowIndex, colIndex)}
          />
        ))
      )}
    </div>
  );
}
