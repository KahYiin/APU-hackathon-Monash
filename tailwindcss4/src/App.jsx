import './App.css'
import HomePage from "./pages/HomePage";
import WalletPage from "./pages/WalletPage";
import MarketplacePage from "./pages/MarketplacePage";
import RecyclePage from "./pages/RecyclePage";



import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/wallet" element={<WalletPage />} />
        <Route path="/marketplace" element={<MarketplacePage />} />
        <Route path="/recycle" element={<RecyclePage />} />
      </Routes>
    </Router>
  );
}

export default App;
