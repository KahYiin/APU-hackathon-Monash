import { useState } from "react";
import { motion } from "framer-motion";

export default function HomePage() {
  const [isRecycleOpen, setIsRecycleOpen] = useState(false);

  const leaderboard = [
    { name: "Alice", points: 450 },
    { name: "Bob", points: 390 },
    { name: "Charlie", points: 350 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E8E1C8] to-[#D6C99B] p-8 text-center overflow-x-hidden relative">
      {/* Floating leaf icons */}
      <div className="pointer-events-none fixed inset-0 z-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-[#A6BB56] text-2xl"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`
            }}
            animate={{ y: [0, 20, 0], rotate: [0, 10, -10, 0] }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            🍃
          </motion.div>
        ))}
      </div>

      {/* Hero Header */}
      <motion.header
        className="mb-6 text-center z-10 relative"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-[#4C3D19] to-[#5A7030] drop-shadow-sm select-none"
          animate={{ opacity: [1, 0.8, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Welcome to RecyChain ♻️
        </motion.h1>
        <p className="text-lg md:text-xl text-[#506034] max-w-xl mx-auto font-semibold drop-shadow-sm">
          Turn your trash into treasure and get rewarded for sustainable
          actions.
        </p>
      </motion.header>

      {/* Why RecyChain */}
      <motion.section
        className="mt-10 z-10 relative max-w-2xl mx-auto bg-white/60 backdrop-blur-md p-8 rounded-3xl shadow-lg"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-semibold mb-3 text-[#4C3D19] drop-shadow-sm">
          Why RecyChain?
        </h2>
        <p className="text-[#4C3D19] text-lg leading-relaxed font-medium drop-shadow-sm">
          RecyChain uses blockchain to track and reward your recycling efforts
          transparently. Earn RecyCoins (RC) for your items, burn them for
          EcoCredits (EC), and make a direct impact on the environment. Join the
          movement for a cleaner planet.
        </p>
      </motion.section>

      {/* Wallet Button */}
      <motion.div
        className="mt-10 flex justify-center bg-gradient-to-r from-[#A6BB56] to-[#8AA034] p-[3px] rounded-full shadow-lg max-w-xs mx-auto mb-12"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <motion.a
          href="/register"
          className="w-full text-center px-6 py-3 bg-[#677839] text-[#F2F0DC] rounded-full shadow-lg font-bold tracking-wide text-lg"
          aria-label="Wallet"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          💰 My Wallet
        </motion.a>
      </motion.div>

      {/* Leaderboard Section */}
      <motion.section
        className="mt-12 z-10 relative"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="text-center mb-6">
          <h2 className="text-3xl font-extrabold text-[#5A5F29] drop-shadow-sm flex justify-center items-center gap-2 select-none">
            🏆 Top Recyclers
            <motion.span
              animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="inline-block"
            >
              🥇
            </motion.span>
          </h2>
          <p className="text-[#506034] mt-1 font-semibold drop-shadow-sm text-sm md:text-base">
            Celebrating our eco-heroes of the month!
          </p>
        </div>

        <div className="w-full max-w-md mx-auto bg-white bg-opacity-80 backdrop-blur-sm rounded-2xl shadow-lg p-6">
          <ul className="space-y-4">
            {leaderboard.map((user, index) => (
              <motion.li
                key={index}
                className="flex justify-between items-center bg-[#E9E7D5] hover:bg-[#F0F0DB] px-5 py-3 rounded-xl shadow-sm cursor-pointer"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.25, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, rotateZ: 1 }}
                whileTap={{ scale: 0.97 }}
                style={{ perspective: 600 }}
              >
                <div className="flex items-center space-x-4">
                  <span className="text-xl font-extrabold text-[#8BA04B] select-none">
                    #{index + 1}
                  </span>
                  <span className="text-base font-semibold text-[#59602D] select-text">
                    {user.name}
                  </span>
                </div>
                <span className="font-extrabold text-[#73893F] text-lg select-none">
                  {user.points} RC
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.section>
    </div>
  );
}
