/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react';
import useGrid from '../../hooks/useGrid';
import Loader from '../Loader';
import GameInfoModal from './GameInfoModal';
import GuessAttemptsCounter from './GuessAttemptsCounter';
import { StatisticsContext } from '../../context/StatisticsContext';
import ConfettiExplosion from 'react-confetti-explosion';
import { MdClose } from 'react-icons/md';
import Toast from './Toast';

type GridProps = {
  setStartGame: (value: boolean) => void;
};

// Function to determine the cell's color based on its height
const getCellColor = (height: number): string => {
  if (height === 0) {
    return 'bg-blue-800';
  } else if (height > 0 && height <= 50) {
    return 'bg-blue-500';
  } else if (height > 50 && height <= 100) {
    return 'bg-blue-300';
  } else if (height > 100 && height <= 200) {
    return 'bg-yellow-200';
  } else if (height > 200 && height <= 300) {
    return 'bg-yellow-400';
  } else if (height > 300 && height <= 400) {
    return 'bg-green-400';
  } else if (height > 400 && height <= 500) {
    return 'bg-green-600';
  } else if (height > 500 && height <= 600) {
    return 'bg-green-800';
  } else if (height > 600 && height <= 700) {
    return 'bg-green-900';
  } else if (height > 700 && height <= 800) {
    return 'bg-gray-400';
  } else if (height > 800 && height <= 950) {
    return 'bg-gray-200';
  } else if (height > 950 && height <= 1000) {
    return 'bg-white';
  } else {
    return '';
  }
};

export default function Grid({ setStartGame }: GridProps) {
  const { grid, loading, error, handleStartNewGame } = useGrid();
  const statisticsContext = useContext(StatisticsContext);

  // Game logic states
  const [gameOver, setGameOver] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [guessesLeft, setGuessesLeft] = useState(3);
  const [highestIslandCellsSet, setHighestIslandCellsSet] = useState<Set<string>>(new Set());
  const [isExploding, setIsExploding] = useState(false);
  const [showToast, setShowToast] = useState(false);

  if (!statisticsContext) {
    throw new Error('StatisticsContext not found');
  }

  const { updateStatistics } = statisticsContext;
  // Reset the game data
  const resetGameData = () => {
    setHighestIslandCellsSet(new Set());
    setGuessesLeft(3);
    setGameOver(false);
    setShowModal(false);
    setIsExploding(false);
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
  const handleCellClick = (rowIndex: number, colIndex: number, height: number) => {
    if (height === 0) {
      setShowToast(true);
      return;
    }
    if (gameOver) {
      return;
    }

    const cellKey = `${rowIndex}-${colIndex}`;

    if (highestIslandCellsSet.has(cellKey)) {
      setGameOver(true);
      setModalMessage('You won! You found the highest average height island.');
      setShowModal(true);
      setIsExploding(true);
    } else {
      if (guessesLeft - 1 > 0) {
        setGuessesLeft((prev) => prev - 1);
      } else {
        setGuessesLeft(0);
        setGameOver(true);
        setModalMessage('You lost! No guesses left.');
        setShowModal(true);
      }
    }
  };

  useEffect(() => {
    if (gameOver) {
      const hasWon = modalMessage.includes('won');
      if (updateStatistics) {
        updateStatistics(hasWon);
      }
    }
  }, [gameOver, modalMessage]);

  useEffect(() => {
    // Set the highest island cells set
    if (grid && grid.islands.length > 0 && grid.highestAverageIslandIndex !== null) {
      const highestIsland = grid.islands[grid.highestAverageIslandIndex];
      const cellSet = new Set<string>(highestIsland.cells.map((cell) => `${cell.row}-${cell.col}`));
      setHighestIslandCellsSet(cellSet);
    }
  }, [grid?.islands, grid?.highestAverageIslandIndex, grid]);

  if (loading) return <Loader />;
  if (error)
    return (
      <div className="flex flex-col items-center justify-center rounded border border-red-400 bg-red-100 p-4 text-red-700">
        <div className="flex items-center justify-center">
          <span className="text-3xl">
            <MdClose />
          </span>
          {error}
        </div>
        <div>
          <button
            onClick={handleStartNewGame}
            className="mt-4 rounded bg-red-500 px-4 py-2 text-white hover:border-red-900"
          >
            Try Again
          </button>
        </div>
      </div>
    );

  return (
    <>
      {isExploding && <ConfettiExplosion />}
      {/* Guess counter */}
      <GuessAttemptsCounter totalGuesses={3} guessesLeft={guessesLeft} />
      {/* Game grid */}
      <div className="grid grid-cols-30">
        {grid?.matrix.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`h-4 w-4 ${grid.matrix[rowIndex][colIndex] > 0 ? 'hover:border-2' : ''} hover:border-black ${getCellColor(cell)}`}
              onClick={() => {
                const height = grid.matrix[rowIndex][colIndex];
                handleCellClick(rowIndex, colIndex, height);
              }}
            />
          ))
        )}
      </div>
      <button
        onClick={handleResetGame}
        className="mt-4 rounded bg-red-500 px-4 py-2 text-white hover:border-red-900"
      >
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

      {showToast && (
        <Toast message="You can't click on the sea!" onClose={() => setShowToast(false)} />
      )}
    </>
  );
}
