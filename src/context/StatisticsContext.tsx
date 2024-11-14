import { createContext, useState, useEffect } from 'react';

interface Statistics {
  gamesPlayed: number;
  wins: number;
  losses: number;
  accuracy: number; // Percentage of wins over games played
}

interface StatisticsContextProps {
  statistics: Statistics;
  updateStatistics: (win: boolean) => void;
}

export const StatisticsContext = createContext<StatisticsContextProps | undefined>(undefined);

import { ReactNode } from 'react';

interface StatisticsProviderProps {
  children: ReactNode;
}

export default function StatisticsProvider({ children }: StatisticsProviderProps) {
  const [statistics, setStatistics] = useState<Statistics>({
    gamesPlayed: 0,
    wins: 0,
    losses: 0,
    accuracy: 0,
  });

  // Load and save statistics logic remains the same
  useEffect(() => {
    const storedStats = localStorage.getItem('gameStatistics');
    if (storedStats) {
      setStatistics(JSON.parse(storedStats));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('gameStatistics', JSON.stringify(statistics));
  }, [statistics]);

  const updateStatistics = (win: boolean) => {
    setStatistics((prevStats) => {
      const updatedStats = {
        ...prevStats,
        gamesPlayed: prevStats.gamesPlayed + 1,
        wins: prevStats.wins + (win ? 1 : 0),
        losses: prevStats.losses + (win ? 0 : 1),
      };
      updatedStats.accuracy = (updatedStats.wins / updatedStats.gamesPlayed) * 100;
      return updatedStats;
    });
  };

  return (
    <StatisticsContext.Provider value={{ statistics, updateStatistics }}>
      {children}
    </StatisticsContext.Provider>
  );
}
