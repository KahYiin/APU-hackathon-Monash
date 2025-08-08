import { useState } from "react";

export default function RecyclePopup() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#CFBB99] flex items-center justify-center p-6">
      {/* Button to open modal */}
      <button
        onClick={() => setIsOpen(true)}
        className="px-6 py-3 bg-[#6B8E23] text-white rounded-xl shadow hover:bg-[#556B2F] transition"
      >
        ♻️ Recycle Now
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-[#F8F4E3] rounded-lg shadow-lg w-full max-w-md p-6 relative">
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-xl bg-transparent"
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
                className="w-full p-2 border rounded bg-white"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#6B8E23] text-white rounded hover:bg-[#556B2F] transition"
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
