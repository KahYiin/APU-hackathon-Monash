// RecyChain UI Pages using React + Tailwind

// 1. Home Page
export function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-blue-100 p-8 text-center">
      <header className="mb-10">
        <h1 className="text-5xl font-extrabold text-green-800 mb-4">Welcome to RecyChain</h1>
        <p className="text-xl text-gray-700">Turn your trash into treasure and get rewarded for sustainable actions.</p>
      </header>

      <div className="flex justify-center gap-6 flex-wrap">
        <a href="/wallet" className="px-6 py-3 bg-green-600 text-white rounded-xl shadow hover:bg-green-700 transition">💰 Wallet</a>
        <a href="/marketplace" className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition">🛍️ Marketplace</a>
        <a href="/recycle" className="px-6 py-3 bg-yellow-500 text-white rounded-xl shadow hover:bg-yellow-600 transition">♻️ Recycle Now</a>
        <a href="/leaderboard" className="px-6 py-3 bg-purple-600 text-white rounded-xl shadow hover:bg-purple-700 transition">🏆 Leaderboard</a>
      </div>

      <section className="mt-16">
        <h2 className="text-3xl font-semibold mb-4">Why RecyChain?</h2>
        <p className="max-w-2xl mx-auto text-gray-600">
          RecyChain uses blockchain to track and reward your recycling efforts transparently. Earn RecyCoins (RC) for your items, burn them for EcoCredits (EC), and make a direct impact on the environment. Join the movement for a cleaner planet.
        </p>
      </section>
    </div>
  );
}

// 2. Wallet Page
export function WalletPage() {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Your Wallet</h2>
      <div className="bg-white p-4 rounded shadow">
        <p className="text-xl">RecyCoins (RC): <span className="font-semibold">120</span></p>
        <p className="text-xl">EcoCredits (EC): <span className="font-semibold">15</span></p>
      </div>
    </div>
  );
}

// 3. Marketplace Page
export function MarketplacePage() {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Marketplace</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Sample item */}
        <div className="border p-4 rounded shadow">
          <h3 className="text-xl font-semibold">Eco-friendly Bottle</h3>
          <p className="text-gray-600">20 RC</p>
          <button className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Buy</button>
        </div>
        {/* Repeat for more items */}
      </div>
    </div>
  );
}

// 4. Recycle Input Page
export function RecyclePage() {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Submit Recyclables</h2>
      <form className="space-y-4">
        <input type="text" placeholder="Item Type (e.g. Plastic Bottle)" className="w-full p-2 border rounded" />
        <input type="number" placeholder="Quantity" className="w-full p-2 border rounded" />
        <input type="file" className="w-full p-2" />
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Submit</button>
      </form>
    </div>
  );
}

// 5. Leaderboard Page
export function LeaderboardPage() {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Top Recyclers</h2>
      <ul className="space-y-2">
        <li className="bg-white p-4 rounded shadow flex justify-between"><span>Alice</span><span>450 RC</span></li>
        <li className="bg-white p-4 rounded shadow flex justify-between"><span>Bob</span><span>390 RC</span></li>
        <li className="bg-white p-4 rounded shadow flex justify-between"><span>Charlie</span><span>350 RC</span></li>
        {/* More users */}
      </ul>
    </div>
  );
}
