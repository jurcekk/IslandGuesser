export type Cell = {
  row: number;
  col: number;
};

export type Island = {
  cells: Cell[];
  averageHeight: number;
};

export type Matrix = number[][];

export type GridData = {
  matrix: Matrix;
  islands: Island[];
  highestAverageIslandIndex: number;
};
