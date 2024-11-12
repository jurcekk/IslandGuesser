import { useState } from 'react';
import useGrid from '../../hooks/useGrid';
import Loader from '../Loader';

export default function Grid() {
  const { grid, loading, error } = useGrid();
  const [hasGameStarted, setHasGameStarted] = useState<boolean>(false);

  const startGame = () => {
    setHasGameStarted(true);
  };

  if (loading) return <Loader />;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      {!hasGameStarted ? (
        // Starter screen with statistics and start button
        <div className="starter-screen text-center">
          <h1 className="mb-4 text-2xl font-bold">Island Guesser Game</h1>
          <button
            onClick={startGame}
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Start Game
          </button>
        </div>
      ) : (
        // Grid container
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
      )}
    </div>
  );
}
