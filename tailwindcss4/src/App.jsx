import './App.css'
import { HomePage, WalletPage, MarketplacePage, RecyclePage, LeaderboardPage } from './uiPage.jsx';


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/wallet" element={<WalletPage />} />
        <Route path="/marketplace" element={<MarketplacePage />} />
        <Route path="/recycle" element={<RecyclePage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
      </Routes>
    </Router>
  );
}

export default App;
