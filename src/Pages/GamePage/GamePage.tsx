import StartGame from '../../Components/StartGame';
import Grid from '../../Components/Grid';
import { useState } from 'react';

export default function GamePage() {
  const [hasGameStarted, setHasGameStarted] = useState<boolean>(false);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      {!hasGameStarted ? (
        // Start component with start button
        <StartGame setStartGame={setHasGameStarted} />
      ) : (
        // Game component with grid
        <Grid setStartGame={setHasGameStarted} />
      )}
    </div>
  );
}
