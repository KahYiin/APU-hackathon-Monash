import "./App.css";
import HomePage from "./pages/HomePage";
import WalletPage from "./pages/WalletPage";
import MarketplacePage from "./pages/MarketplacePage";
import RecyclePage from "./pages/RecyclePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import WithdrawPage from "./pages/WithdrawalPage";
import RedeemAwardsPage from "./pages/RedeemRewardsPage";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/wallet" element={<WalletPage />} />
        <Route path="/marketplace" element={<MarketplacePage />} />
        <Route path="/recycle" element={<RecyclePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/withdrawal" element={<WithdrawPage />} />
        <Route path="/rewards" element={<RedeemAwardsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
