import { useContext } from 'react';
import GameStatistics from '../GameStatistics';
import { StatisticsContext } from '../../context/StatisticsContext';

type StartGameProps = {
  setStartGame: (value: boolean) => void;
};

export default function StartGame({ setStartGame }: StartGameProps) {
  const statisticsContext = useContext(StatisticsContext);

  if (!statisticsContext) {
    throw new Error('StatisticsContext not found');
  }

  const { statistics } = statisticsContext;

  return (
    // Starter screen start button
    <div className="starter-screen text-center">
      <h1 className="mb-4 text-2xl font-bold">Island Guesser Game</h1>
      <GameStatistics statistics={statistics} />
      <button
        onClick={() => setStartGame(true)}
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        Start Game
      </button>
    </div>
  );
}
