import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Grid() {
  const [grid, setGrid] = useState<number[][]>([]);
  const [islands, setIslands] = useState<{ row: number; col: number }[][]>([]);
  console.log('Islands', islands);
  function parseMatrixWithIslands(data: string): {
    matrix: number[][];
    islands: { row: number; col: number }[][];
  } {
    const rows = data.trim().split('\n');
    const matrix: number[][] = [];

    for (let i = 0; i < 30; i++) {
      // Handle cases where there are fewer than 30 rows
      const row = rows[i] ? rows[i].trim().split(/\s+/) : [];
      const numbers = row.map((numStr) => parseInt(numStr, 10));

      // Pad the row with zeros if it has fewer than 30 numbers
      while (numbers.length < 30) {
        numbers.push(0);
      }

      // Truncate the row if it has more than 30 numbers
      if (numbers.length > 30) {
        numbers.length = 30;
      }

      matrix.push(numbers);
    }

    // Now, find the islands
    const visited: boolean[][] = [];
    for (let i = 0; i < 30; i++) {
      visited.push(new Array(30).fill(false));
    }

    const islands: { row: number; col: number }[][] = [];

    for (let row = 0; row < 30; row++) {
      for (let col = 0; col < 30; col++) {
        if (!visited[row][col] && matrix[row][col] !== 0) {
          // Start a new island
          const islandCells: { row: number; col: number }[] = [];
          exploreIsland(matrix, visited, row, col, islandCells);
          islands.push(islandCells);
        }
      }
    }

    return { matrix, islands };

    function exploreIsland(
      matrix: number[][],
      visited: boolean[][],
      startRow: number,
      startCol: number,
      islandCells: { row: number; col: number }[]
    ) {
      const stack: [number, number][] = [];
      stack.push([startRow, startCol]);

      while (stack.length > 0) {
        const [currentRow, currentCol] = stack.pop()!;
        if (currentRow < 0 || currentRow >= 30 || currentCol < 0 || currentCol >= 30) continue;
        if (visited[currentRow][currentCol]) continue;
        if (matrix[currentRow][currentCol] === 0) continue;

        visited[currentRow][currentCol] = true;
        islandCells.push({ row: currentRow, col: currentCol });

        stack.push([currentRow - 1, currentCol]);
        stack.push([currentRow + 1, currentCol]);
        stack.push([currentRow, currentCol - 1]);
        stack.push([currentRow, currentCol + 1]);
      }
    }
  }

  const getGridData = async () => {
    const data = await axios.request({
      method: 'GET',
      url: 'https://jobfair.nordeus.com/jf24-fullstack-challenge/test',
    });

    const grid = data.data;

    const matrix = parseMatrixWithIslands(grid);

    console.log(matrix);
    setGrid(matrix.matrix);
    setIslands(matrix.islands);
  };

  useEffect(() => {
    getGridData();
  }, []);
  return (
    <div className="grid grid-cols-30">
      {grid.map((row, rowIndex) =>
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
