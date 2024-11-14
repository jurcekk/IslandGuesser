import './App.css';
import StatisticsProvider from './context/StatisticsContext';
import GamePage from './Pages/GamePage';

function App() {
  return (
    <StatisticsProvider>
      <GamePage />
    </StatisticsProvider>
  );
}

export default App;
