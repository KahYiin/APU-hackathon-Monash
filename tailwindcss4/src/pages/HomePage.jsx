export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#CFBB99] p-8 text-center">
      <header className="mb-10">
        <h1 className="text-5xl font-extrabold text-[#4C3D19] mb-4">
          Welcome to RecyChain
        </h1>
        <p className="text-xl text-[#354024]">
          Turn your trash into treasure and get rewarded for sustainable actions.
        </p>
      </header>

      <div className="flex justify-center gap-6 flex-wrap">
        <a
          href="/wallet"
          className="px-6 py-3 bg-[#354024] text-white rounded-xl shadow hover:bg-[#4C3D19] transition"
        >
          💰 Wallet
        </a>
        <a
          href="/marketplace"
          className="px-6 py-3 bg-[#889063] text-white rounded-xl shadow hover:bg-[#354024] transition"
        >
          🛍️ Marketplace
        </a>
        <a
          href="/recycle"
          className="px-6 py-3 bg-[#E5D7C4] text-[#4C3D19] rounded-xl shadow hover:bg-[#CFBB99] transition"
        >
          ♻️ Recycle Now
        </a>
        <a
          href="/leaderboard"
          className="px-6 py-3 bg-[#4C3D19] text-white rounded-xl shadow hover:bg-[#354024] transition"
        >
          🏆 Leaderboard
        </a>
      </div>

      <section className="mt-16">
        <h2 className="text-3xl font-semibold mb-4 text-[#4C3D19]">
          Why RecyChain?
        </h2>
        <p className="max-w-2xl mx-auto text-[#354024]">
          RecyChain uses blockchain to track and reward your recycling efforts
          transparently. Earn RecyCoins (RC) for your items, burn them for
          EcoCredits (EC), and make a direct impact on the environment. Join the
          movement for a cleaner planet.
        </p>
      </section>
    </div>
  );
}
