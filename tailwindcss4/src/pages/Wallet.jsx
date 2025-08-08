export default function WalletPage() {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Your Wallet</h2>
      <div className="bg-white p-4 rounded shadow">
        <p className="text-xl">
          RecyCoins (RC): <span className="font-semibold">120</span>
        </p>
        <p className="text-xl">
          EcoCredits (EC): <span className="font-semibold">15</span>
        </p>
      </div>
    </div>
  );
}
