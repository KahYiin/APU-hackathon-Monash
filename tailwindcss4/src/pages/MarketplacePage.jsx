// export default function MarketplacePage() {
//   return (
//     <div className="p-6">
//       <h2 className="text-3xl font-bold mb-4">Marketplace</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         <div className="border p-4 rounded shadow">
//           <h3 className="text-xl font-semibold">Eco-friendly Bottle</h3>
//           <p className="text-gray-600">20 RC</p>
//           <button className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
//             Buy
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

const sampleItems = [
  {
    id: 1,
    name: "Reusable Bamboo Straw Set",
    price: 12,
    image: null,
    category: "Kitchen"
  },
  {
    id: 2,
    name: "Eco-friendly Tote Bag",
    price: 18,
    image: null,
    category: "Bags"
  },
  {
    id: 3,
    name: "Recycled Paper Notebook",
    price: 8,
    image: null,
    category: "Stationery"
  },
  {
    id: 4,
    name: "Solar Powered Charger",
    price: 40,
    image: null,
    category: "Gadgets"
  }
];

export default function FancyMarketplace() {
  const [categoryFilter, setCategoryFilter] = useState("All");

  const categories = ["All", "Kitchen", "Bags", "Stationery", "Gadgets"];

  const filteredItems =
    categoryFilter === "All"
      ? sampleItems
      : sampleItems.filter((item) => item.category === categoryFilter);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E8E1C8] to-[#D6C99B] p-8 text-[#4C3D19]">
      {/* Header */}
      <motion.header
        className="mb-10 text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl font-extrabold mb-3 bg-gradient-to-r from-[#4C3D19] to-[#5A7030] bg-clip-text text-transparent select-none drop-shadow-lg">
          Marketplace 🛍️
        </h1>
        <p className="max-w-xl mx-auto font-semibold drop-shadow-md text-lg">
          Shop eco-friendly products and support sustainable living.
        </p>
      </motion.header>

      {/* Filter */}
      <div className="max-w-md mx-auto mb-12 relative">
        <label
          htmlFor="category"
          className="block mb-2 font-semibold text-lg select-none"
        >
          Filter by category:
        </label>
        <select
          id="category"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="w-full p-3 rounded-3xl border-2 border-[#8BA04B] bg-white shadow-md appearance-none focus:outline-none focus:ring-4 focus:ring-[#A6BB56] transition cursor-pointer"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <div className="absolute right-5 top-[42px] text-[#73893F] select-none cursor-pointer hover:text-[#55642B] pt-2">
          <Search size={20} />
        </div>
      </div>

      {/* Product Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-6xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.2
            }
          }
        }}
      >
        {filteredItems.map((item) => (
          <motion.div
            key={item.id}
            className="relative bg-white rounded-3xl shadow-2xl overflow-hidden cursor-pointer transform transition-transform duration-300"
            whileHover={{ scale: 1.08, rotateX: 8, rotateY: 6, zIndex: 10 }}
            whileTap={{ scale: 0.95 }}
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 }
            }}
          >
            {/* Image with zoom and overlay */}
            <div className="relative overflow-hidden rounded-t-3xl">
              <motion.img
                src={item.image}
                alt={item.name}
                className="w-full h-56 object-cover transform transition-transform duration-500"
                whileHover={{ scale: 1.15 }}
                loading="lazy"
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-70 transition-opacity"
                aria-hidden="true"
              />
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col justify-between h-48">
              <motion.h3
                className="font-extrabold text-2xl mb-1 text-[#55642B] select-text"
                animate={{
                  textShadow: [
                    "0 0 0 rgba(117,138,52,0)",
                    "0 0 10px rgba(117,138,52,0.8)",
                    "0 0 0 rgba(117,138,52,0)"
                  ]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 8,
                  ease: "easeInOut"
                }}
              >
                {item.name}
              </motion.h3>

              <p className="text-sm text-[#7D8A3F] mb-4">{item.category}</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-extrabold text-[#73893F]">
                  ${item.price}
                </span>
                <button
                  className="relative overflow-hidden px-5 py-3 bg-gradient-to-r from-[#8AA034] to-[#A6BB56] text-[#414B1A] rounded-3xl shadow-lg font-semibold tracking-wide
                  hover:from-[#A6BB56] hover:to-[#8AA034] transition-all duration-500"
                  aria-label={`Buy ${item.name}`}
                  onClick={() => alert(`Bought ${item.name}! 🛒`)}
                >
                  {/* Ripple effect */}
                  <span
                    className="absolute inset-0 rounded-3xl bg-white opacity-0 pointer-events-none"
                    style={{ animation: "ripple 0.6s ease-out" }}
                  />
                  Buy
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <style jsx>{`
        @keyframes ripple {
          0% {
            opacity: 0.4;
            transform: scale(0);
          }
          100% {
            opacity: 0;
            transform: scale(2.5);
          }
        }
      `}</style>
    </div>
  );
}
