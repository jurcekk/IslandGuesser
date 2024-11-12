import useGrid from '../../hooks/useGrid';
import Loader from '../Loader';

export default function Grid() {
  const { grid, loading, error } = useGrid();

  if (loading) return <Loader />;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
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
  );
}
