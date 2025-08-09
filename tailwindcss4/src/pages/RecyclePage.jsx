import { useState } from "react";
import { motion } from "framer-motion";

export default function RecyclePage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="min-h-screen bg-fixed bg-center bg-cover relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1600&q=80')"
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#4C3D19]/50"></div>

      {/* Content */}
      <div className="relative z-10 p-8 text-center text-white">
        {/* Twinkling Title */}
        <motion.h1
          className="text-5xl font-extrabold mb-4 drop-shadow-lg"
          animate={{
            opacity: [1, 0.7, 1],
            textShadow: [
              "0px 0px 0px #fff",
              "0px 0px 8px #A4C26A",
              "0px 0px 0px #fff"
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          ♻️ Recycle & Earn Rewards
        </motion.h1>

        <p className="text-lg max-w-2xl mx-auto mb-12 drop-shadow-md">
          Turn your waste into value. Follow these simple steps and start making
          a difference today!
        </p>

        {/* Steps stacked vertically in the center */}
        <div className="flex flex-col items-center gap-6 max-w-md mx-auto mb-12">
          {[
            {
              step: 1,
              title: "Collect",
              desc: "Gather recyclable items like plastics, paper, and metals."
            },
            {
              step: 2,
              title: "Submit",
              desc: "Upload the item details and quantity in the form."
            },
            {
              step: 3,
              title: "Earn",
              desc: "Receive rewards instantly for every item recycled."
            }
          ].map((s, i) => (
            <div
              key={i}
              className="relative w-full bg-[#8BA04B]/30 p-6 rounded-2xl backdrop-blur-md hover:scale-105 transition transform shadow-lg border border-white/20 text-center"
            >
              {/* Big number on left */}
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-6xl font-extrabold text-[#A4C26A] opacity-80">
                {s.step}
              </div>
              {/* Title centered */}
              <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
              {/* Description */}
              <p className="text-sm opacity-90">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="px-8 py-4 bg-[#8BA04B] text-white font-bold text-lg rounded-full shadow-lg hover:scale-110 hover:bg-[#73893F] transition transform"
        >
          ♻️ Recycle Now
        </button>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 backdrop-blur-sm">
          <div className="bg-[#F8F4E3] rounded-2xl shadow-2xl w-full max-w-md p-8 relative animate-fadeIn border border-[#B4BD81]">
            {/* Close */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-[#8B2E2E] text-2xl bg-transparent border-none outline-none focus:outline-none"
            >
              ✖
            </button>

            <h2 className="text-3xl font-bold mb-6 text-[#4C3D19]">
              Submit Recyclables
            </h2>

            <form className="space-y-5">
              <input
                type="text"
                placeholder="Item Type (e.g. Plastic Bottle)"
                className="w-full p-3 border-2 border-[#B4BD81] rounded-xl focus:outline-none focus:ring-4 focus:ring-[#A4C26A]/50 transition text-[#59602D]"
              />
              <input
                type="number"
                placeholder="Quantity"
                min={1}
                className="w-full p-3 border-2 border-[#B4BD81] rounded-xl focus:outline-none focus:ring-4 focus:ring-[#A4C26A]/50 transition text-[#59602D]"
              />
              <input
                type="file"
                className="w-full p-3 border-2 border-[#B4BD81] rounded-xl bg-[#F8F7E9] focus:outline-none focus:ring-4 focus:ring-[#A4C26A]/50 transition"
              />
              <button
                type="submit"
                className="w-full px-5 py-3 bg-[#73893F] text-white rounded-xl hover:bg-[#8BA04B] shadow-md transition text-sm md:text-base"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
