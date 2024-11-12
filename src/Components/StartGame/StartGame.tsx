type StartGameProps = {
  startGame: () => void;
};

export default function StartGame({ startGame }: StartGameProps) {
  return (
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
  );
}
