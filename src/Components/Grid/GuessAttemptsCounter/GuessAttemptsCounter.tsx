import { ReactElement } from 'react';

interface GuessAttemptsProps {
  guessesLeft: number;
  totalGuesses: number;
}

export default function GuessAttemptsCounter({
  guessesLeft,
  totalGuesses,
}: GuessAttemptsProps): ReactElement {
  const attempts = [];

  for (let i = 0; i < totalGuesses; i++) {
    const isActive = i < guessesLeft;
    attempts.push(
      <div
        key={i}
        className="flex h-12 w-12 items-center justify-center rounded-md border border-gray-700"
      >
        {isActive ? null : <span className="text-2xl font-bold text-red-600">❌</span>}
      </div>
    );
  }

  return (
    <div className="mb-6 flex flex-col font-bold">
      <span className="mb-2 text-xl">Guesses:</span>
      <div className="flex space-x-2">{attempts}</div>
    </div>
  );
}
