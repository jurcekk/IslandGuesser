import { Statistics } from '../../types/statistics';
import { FaGamepad, FaTrophy, FaRegSadCry, FaPercent } from 'react-icons/fa'; // Importing icons

type GameStatisticsProps = {
  statistics: Statistics;
};

export default function GameStatistics({ statistics }: GameStatisticsProps) {
  return (
    <div className="mx-auto mb-6 max-w-sm rounded-lg p-6 shadow-2xl">
      <div className="space-y-4">
        <div className="flex items-center">
          <FaGamepad className="mr-4 text-2xl text-blue-500" />
          <p className="text-lg">
            <span className="font-medium">Games Played:</span> {statistics.gamesPlayed}
          </p>
        </div>
        <div className="flex items-center">
          <FaTrophy className="mr-4 text-2xl text-green-500" />
          <p className="text-lg">
            <span className="font-medium">Wins:</span> {statistics.wins}
          </p>
        </div>
        <div className="flex items-center">
          <FaRegSadCry className="mr-4 text-2xl text-red-500" />
          <p className="text-lg">
            <span className="font-medium">Losses:</span> {statistics.losses}
          </p>
        </div>
        <div className="flex items-center">
          <FaPercent className="mr-4 text-2xl text-yellow-500" />
          <p className="text-lg">
            <span className="font-medium">Accuracy:</span>{' '}
            {statistics.gamesPlayed > 0 ? statistics.accuracy.toFixed(2) + '%' : 'N/A'}
          </p>
        </div>
      </div>
    </div>
  );
}
