import { useState } from 'react';
import StartGame from '../../Components/StartGame';
import Grid from '../../Components/Grid';

export default function GamePage() {
  const [hasGameStarted, setHasGameStarted] = useState<boolean>(false);

  const handleStartGame = () => {
    setHasGameStarted(true);
  };
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      {!hasGameStarted ? (
        // Start component with start button
        <StartGame startGame={handleStartGame} />
      ) : (
        // Game component with grid
        <Grid />
      )}
    </div>
  );
}
