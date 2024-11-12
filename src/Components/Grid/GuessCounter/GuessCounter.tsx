type GuessCounterProps = {
  message: string;
  guessesLeft: number;
};

export default function GuessCounter({ message, guessesLeft }: GuessCounterProps) {
  return (
    <div className="mb-4 text-center">
      <p>{message}</p>
      <p>Guesses left: {guessesLeft}</p>
    </div>
  );
}
