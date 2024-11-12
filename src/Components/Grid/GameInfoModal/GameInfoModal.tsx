type GameInfoModalProps = {
  modalMessage: string;
  handlePlayAgain: () => void;
  handleResetGame: () => void;
};

export default function GameInfoModal({
  modalMessage,
  handlePlayAgain,
  handleResetGame,
}: GameInfoModalProps) {
  return (
    <div className="modal fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="rounded bg-white p-6">
        <p className="mb-4 text-blue-950">{modalMessage}</p>
        <button
          onClick={handlePlayAgain}
          className="mr-2 rounded bg-green-500 px-4 py-2 text-white"
        >
          Play Again
        </button>
        <button onClick={handleResetGame} className="rounded bg-red-500 px-4 py-2 text-white">
          Exit to Main Screen
        </button>
      </div>
    </div>
  );
}
