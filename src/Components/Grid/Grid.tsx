import { useEffect, useState } from 'react';
import useGrid from '../../hooks/useGrid';
import Loader from '../Loader';
import GameInfoModal from './GameInfoModal';
import GuessCounter from './GuessCounter';

type GridProps = {
  setStartGame: (value: boolean) => void;
};

export default function Grid({ setStartGame }: GridProps) {
  const { grid, loading, error, handleStartNewGame } = useGrid();
  // Game logi states
  const [gameOver, setGameOver] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [message, setMessage] = useState('');
  const [guessesLeft, setGuessesLeft] = useState(3);
  const [highestIslandCellsSet, setHighestIslandCellsSet] = useState<Set<string>>(new Set());

  // Reset the game data
  const resetGameData = () => {
    setHighestIslandCellsSet(new Set());
    setGuessesLeft(3);
    setMessage('');
    setGameOver(false);
    setShowModal(false);
  };

  // Start the game
  const handlePlayAgain = () => {
    setStartGame(true);
    handleStartNewGame();
    resetGameData();
  };

  // Reset the game to the initial state
  const handleResetGame = () => {
    setStartGame(false);
    resetGameData();
  };

  // Handle user clicking on a cell
  const handleCellClick = (rowIndex: number, colIndex: number) => {
    if (gameOver) return;

    const cellKey = `${rowIndex}-${colIndex}`;

    if (highestIslandCellsSet.has(cellKey)) {
      setGameOver(true);
      setModalMessage('You won! You found the highest average height island.');
      setShowModal(true);
    } else {
      if (guessesLeft - 1 > 0) {
        setGuessesLeft((prev) => prev - 1);
        setMessage('Wrong guess!');
      } else {
        setGuessesLeft(0);
        setGameOver(true);
        setModalMessage('You lost! No guesses left.');
        setShowModal(true);
      }
    }
  };

  useEffect(() => {
    // Set the highest island cells set
    if (grid && grid.islands.length > 0 && grid.highestAverageIslandIndex !== null) {
      const highestIsland = grid.islands[grid.highestAverageIslandIndex];
      const cellSet = new Set<string>(highestIsland.cells.map((cell) => `${cell.row}-${cell.col}`));
      setHighestIslandCellsSet(cellSet);
    }
  }, [grid?.islands, grid?.highestAverageIslandIndex, grid]);

  if (loading) return <Loader />;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <>
      {/* Guess counter */}
      <GuessCounter message={message} guessesLeft={guessesLeft} />

      {/* Game grid */}
      <div className="grid grid-cols-30">
        {grid?.matrix.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`h-4 w-4 hover:border-2 hover:border-black ${cell === 0 ? 'bg-blue-400' : 'bg-orange-800'}`}
              onClick={() => handleCellClick(rowIndex, colIndex)}
            />
          ))
        )}
      </div>
      <button onClick={handleResetGame} className="mt-4 rounded bg-red-500 px-4 py-2 text-white">
        End Game
      </button>

      {/* Modal for end of game */}
      {showModal && (
        <GameInfoModal
          handlePlayAgain={handlePlayAgain}
          handleResetGame={handleResetGame}
          modalMessage={modalMessage}
        />
      )}
    </>
  );
}
