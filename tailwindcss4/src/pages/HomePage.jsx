// import { useState } from "react";
// import { motion } from "framer-motion";

// export default function HomePage() {
//   const [isRecycleOpen, setIsRecycleOpen] = useState(false);

//   const leaderboard = [
//     { name: "Alice", points: 450 },
//     { name: "Bob", points: 390 },
//     { name: "Charlie", points: 350 },
//   ];

//   return (
//     <div className="min-h-screen bg-[#CFBB99] p-8 text-center overflow-x-hidden">


      // {/* Hero Header */}
      // <motion.header
      //   className="mb-6 text-center z-10 relative"
      //   initial={{ opacity: 0, y: -40 }}
      //   animate={{ opacity: 1, y: 0 }}
      //   transition={{ duration: 0.8 }}
      // >
      //   <h1 className="text-4xl md:text-5xl font-extrabold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-[#4C3D19] to-[#5A7030] drop-shadow-sm select-none">
      //     Welcome to RecyChain ♻️
      //   </h1>
      //   <p className="text-lg md:text-xl text-[#506034] max-w-xl mx-auto font-semibold drop-shadow-sm">
      //     Turn your trash into treasure and get rewarded for sustainable actions.
      //   </p>
      // </motion.header>

      // {/* Navigation Buttons */}
      // <motion.div
      //   className="flex justify-center gap-5 flex-wrap bg-[#CDC49C]/80 p-5 rounded-xl shadow-md max-w-3xl mx-auto mb-12"
      //   initial={{ opacity: 0, scale: 0.8 }}
      //   animate={{ opacity: 1, scale: 1 }}
      //   transition={{ delay: 0.4, duration: 0.6 }}
      // ></motion.div>

//       {/* Navigation Buttons */}
//       <motion.div
//         className="flex justify-center gap-6 flex-wrap bg-[#BFAF90] p-4 rounded-lg shadow-md max-w-3xl mx-auto mb-10"
//         initial={{ opacity: 0, scale: 0.8 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ delay: 0.4, duration: 0.6 }}
//       >
//         <a
//           href="/wallet"
//           className="px-4 py-2 bg-[#354024] text-white rounded-lg hover:bg-[#4C3D19] transition"
//         >
//           💰 Wallet
//         </a>
//         <a
//           href="/marketplace"
//           className="px-4 py-2 bg-[#889063] text-white rounded-lg hover:bg-[#354024] transition"
//         >
//           🛍️ Marketplace
//         </a>
//         <button
//           onClick={() => setIsRecycleOpen(true)}
//           className="px-4 py-2 bg-[#6B8E23] text-white rounded-lg hover:bg-[#556B2F] transition"
//         >
//           ♻️ Recycle Now
//         </button>
//       </motion.div>

//       {/* Why RecyChain Section */}
//       <motion.section
//         className="mt-16"
//         initial={{ opacity: 0, y: 50 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         viewport={{ once: true }}
//       >
//         <h2 className="text-3xl font-semibold mb-4 text-[#4C3D19]">
//           Why RecyChain?
//         </h2>
//         <p className="max-w-2xl mx-auto text-[#354024]">
//           RecyChain uses blockchain to track and reward your recycling efforts
//           transparently. Earn RecyCoins (RC) for your items, burn them for
//           EcoCredits (EC), and make a direct impact on the environment. Join the
//           movement for a cleaner planet.
//         </p>
//       </motion.section>

      {/* Leaderboard Section */}
      // <motion.section
      //   className="mt-12 z-10 relative"
      //   initial={{ opacity: 0 }}
      //   whileInView={{ opacity: 1 }}
      //   transition={{ duration: 0.8 }}
      //   viewport={{ once: true }}
      // >
      //   <div className="text-center mb-6">
      //     <h2 className="text-3xl font-extrabold text-[#5A5F29] drop-shadow-sm flex justify-center items-center gap-2 select-none">
      //       🏆 Top Recyclers
      //       <motion.span
      //         animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
      //         transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      //         className="inline-block"
      //       >
      //         🥇
      //       </motion.span>
      //     </h2>
      //     <p className="text-[#506034] mt-1 font-semibold drop-shadow-sm text-sm md:text-base">
      //       Celebrating our eco-heroes of the month!
      //     </p>
      //   </div>

      //   <div className="w-full max-w-md mx-auto bg-white bg-opacity-80 backdrop-blur-sm rounded-2xl shadow-lg p-6">
      //     <ul className="space-y-4">
      //       {leaderboard.map((user, index) => (
      //         <motion.li
      //           key={index}
      //           className="flex justify-between items-center bg-[#E9E7D5] hover:bg-[#F0F0DB] px-5 py-3 rounded-xl shadow-sm cursor-pointer"
      //           initial={{ opacity: 0, x: -40 }}
      //           whileInView={{ opacity: 1, x: 0 }}
      //           transition={{ delay: index * 0.25, duration: 0.5 }}
      //           viewport={{ once: true }}
      //           whileHover={{ scale: 1.02, rotateZ: 1 }}
      //           whileTap={{ scale: 0.97 }}
      //           style={{ perspective: 600 }}
      //         >
      //           <div className="flex items-center space-x-4">
      //             <span className="text-xl font-extrabold text-[#8BA04B] select-none">
      //               #{index + 1}
      //             </span>
      //             <span className="text-base font-semibold text-[#59602D] select-text">
      //               {user.name}
      //             </span>
      //           </div>
      //           <span className="font-extrabold text-[#73893F] text-lg select-none">
      //             {user.points} RC
      //           </span>
      //         </motion.li>
      //       ))}
      //     </ul>
      //   </div>
      // </motion.section>

//       {/* Recycle Modal */}
//       {isRecycleOpen && (
//         <motion.div
//           className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//         >
//           <motion.div
//             className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative"
//             initial={{ scale: 0.8, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//           >
//             {/* Close button */}
//             <button
//               onClick={() => setIsRecycleOpen(false)}
//               className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 bg-transparent p-1"
//             >
//               ✖
//             </button>

//             <h2 className="text-3xl font-bold mb-4 text-[#4C3D19]">
//               Submit Recyclables
//             </h2>

//             <form className="space-y-4">
//               <input
//                 type="text"
//                 placeholder="Item Type (e.g. Plastic Bottle)"
//                 className="w-full p-2 border rounded"
//               />
//               <input
//                 type="number"
//                 placeholder="Quantity"
//                 className="w-full p-2 border rounded"
//               />
//               <input
//                 type="file"
//                 className="w-full p-2 border rounded bg-gray-50"
//               />
//               <button
//                 type="submit"
//                 className="px-4 py-2 bg-[#4C3D19] text-white rounded hover:bg-[#354024] transition"
//               >
//                 Submit
//               </button>
//             </form>
//           </motion.div>
//         </motion.div>
//       )}
//     </div>
//   );
// }
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
    <div className="min-h-screen bg-gradient-to-b from-[#E8E1C8] to-[#D6C99B] p-8 text-center overflow-x-hidden relative">
      {/* Optional floating particle bg */}
      <div className="pointer-events-none fixed inset-0 z-0">
        {/* You could add a canvas or particle effect here */}
      </div>

      {/* Hero Header */}
      <motion.header
        className="mb-6 text-center z-10 relative"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-[#4C3D19] to-[#5A7030] drop-shadow-sm select-none">
          Welcome to RecyChain ♻️
        </h1>
        <p className="text-lg md:text-xl text-[#506034] max-w-xl mx-auto font-semibold drop-shadow-sm">
          Turn your trash into treasure and get rewarded for sustainable actions.
        </p>
      </motion.header>

      {/* Navigation Buttons */}
      <motion.div
        className="flex justify-center gap-5 flex-wrap bg-[#CDC49C]/80 p-5 rounded-xl shadow-md max-w-3xl mx-auto mb-12"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <a
          href="/wallet"
          className="px-4 py-2 bg-[#677839] text-[#F2F0DC] rounded-lg shadow hover:scale-105 hover:bg-[#809A4A] transition-transform duration-300 text-sm md:text-base"
          aria-label="Wallet"
        >
          💰 Wallet
        </a>
        <a
          href="/marketplace"
          className="px-4 py-2 bg-[#9AA663] text-[#F2F0DC] rounded-lg shadow hover:scale-105 hover:bg-[#B3C271] transition-transform duration-300 text-sm md:text-base"
          aria-label="Marketplace"
        >
          🛍️ Marketplace
        </a>
        <button
          onClick={() => setIsRecycleOpen(true)}
          className="px-4 py-2 bg-[#8AA034] text-[#F2F0DC] rounded-lg shadow hover:scale-105 hover:bg-[#A6BB56] transition-transform duration-300 text-sm md:text-base"
          aria-label="Recycle Now"
        >
          ♻️ Recycle Now
        </button>
      </motion.div>

      {/* Why RecyChain Section */}
      <motion.section
        className="mt-12 z-10 relative"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-semibold mb-3 text-[#4C3D19] drop-shadow-sm">
          Why RecyChain?
        </h2>
        <p className="max-w-2xl mx-auto text-[#4C3D19] text-base md:text-lg leading-relaxed font-medium drop-shadow-sm">
          RecyChain uses blockchain to track and reward your recycling efforts
          transparently. Earn RecyCoins (RC) for your items, burn them for
          EcoCredits (EC), and make a direct impact on the environment. Join the
          movement for a cleaner planet.
        </p>
      </motion.section>

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

      {/* Recycle Modal */}
      {isRecycleOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white bg-opacity-90 rounded-3xl shadow-xl w-full max-w-md p-6 md:p-8 relative"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
          >
            {/* Close button */}
            <button
              onClick={() => setIsRecycleOpen(false)}
              className="absolute top-5 right-5 text-[#7A7F3D] hover:text-[#9CAF59] bg-transparent p-2 rounded-full transition"
              aria-label="Close modal"
            >
              ✖
            </button>

            <h2 className="text-3xl font-bold mb-5 text-[#5A5F29] select-none">
              Submit Recyclables ♻️
            </h2>

            <form className="space-y-5">
              <input
                type="text"
                placeholder="Item Type (e.g. Plastic Bottle)"
                className="w-full p-3 border-2 border-[#B4BD81] rounded-xl focus:outline-none focus:ring-4 focus:ring-[#8BA04B] transition text-[#59602D]"
                required
              />
              <input
                type="number"
                placeholder="Quantity"
                min={1}
                className="w-full p-3 border-2 border-[#B4BD81] rounded-xl focus:outline-none focus:ring-4 focus:ring-[#8BA04B] transition text-[#59602D]"
                required
              />
              <input
                type="file"
                className="w-full p-3 border-2 border-[#B4BD81] rounded-xl bg-[#F8F7E9] focus:outline-none focus:ring-4 focus:ring-[#8BA04B] transition"
              />
              <button
                type="submit"
                className="w-full px-5 py-3 bg-[#73893F] text-white rounded-xl hover:bg-[#8BA04B] shadow-md transition text-sm md:text-base"
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



