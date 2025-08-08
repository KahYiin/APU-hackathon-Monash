import { useState } from "react";
import { motion } from "framer-motion";

export default function HomePage() {
  const [isRecycleOpen, setIsRecycleOpen] = useState(false);

  const leaderboard = [
    { name: "Alice", points: 450 },
    { name: "Bob", points: 390 },
    { name: "Charlie", points: 350 },
  ];

  return (
    <div className="min-h-screen bg-[#CFBB99] p-8 text-center overflow-x-hidden">
      {/* Hero Header */}
      <motion.header
        className="mb-6 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl font-extrabold text-[#4C3D19] mb-4">
          Welcome to RecyChain
        </h1>
        <p className="text-xl text-[#354024]">
          Turn your trash into treasure and get rewarded for sustainable actions.
        </p>
      </motion.header>

      {/* Navigation Buttons */}
      <motion.div
        className="flex justify-center gap-6 flex-wrap bg-[#BFAF90] p-4 rounded-lg shadow-md max-w-3xl mx-auto mb-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <a
          href="/wallet"
          className="px-4 py-2 bg-[#354024] text-white rounded-lg hover:bg-[#4C3D19] transition"
        >
          💰 Wallet
        </a>
        <a
          href="/marketplace"
          className="px-4 py-2 bg-[#889063] text-white rounded-lg hover:bg-[#354024] transition"
        >
          🛍️ Marketplace
        </a>
        <button
          onClick={() => setIsRecycleOpen(true)}
          className="px-4 py-2 bg-[#6B8E23] text-white rounded-lg hover:bg-[#556B2F] transition"
        >
          ♻️ Recycle Now
        </button>
      </motion.div>

      {/* Why RecyChain Section */}
      <motion.section
        className="mt-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-semibold mb-4 text-[#4C3D19]">
          Why RecyChain?
        </h2>
        <p className="max-w-2xl mx-auto text-[#354024]">
          RecyChain uses blockchain to track and reward your recycling efforts
          transparently. Earn RecyCoins (RC) for your items, burn them for
          EcoCredits (EC), and make a direct impact on the environment. Join the
          movement for a cleaner planet.
        </p>
      </motion.section>

      {/* Leaderboard Section */}
      <motion.section
        className="mt-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-[#4C3D19]">
            🏆 Top Recyclers
          </h2>
          <p className="text-[#354024] mt-2">
            Celebrating our eco-heroes of the month!
          </p>
        </div>

        <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
          <ul className="space-y-3">
            {leaderboard.map((user, index) => (
              <motion.li
                key={index}
                className="flex justify-between items-center bg-gray-100 px-4 py-3 rounded-md hover:bg-gray-200 transition"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-lg font-semibold text-gray-800">
                    #{index + 1}
                  </span>
                  <span className="text-gray-700">{user.name}</span>
                </div>
                <span className="font-bold text-green-600">
                  {user.points} RC
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.section>

      {/* Recycle Modal */}
      {isRecycleOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            {/* Close button */}
            <button
              onClick={() => setIsRecycleOpen(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 bg-transparent p-1"
            >
              ✖
            </button>

            <h2 className="text-3xl font-bold mb-4 text-[#4C3D19]">
              Submit Recyclables
            </h2>

            <form className="space-y-4">
              <input
                type="text"
                placeholder="Item Type (e.g. Plastic Bottle)"
                className="w-full p-2 border rounded"
              />
              <input
                type="number"
                placeholder="Quantity"
                className="w-full p-2 border rounded"
              />
              <input
                type="file"
                className="w-full p-2 border rounded bg-gray-50"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#4C3D19] text-white rounded hover:bg-[#354024] transition"
              >
                Submit
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
