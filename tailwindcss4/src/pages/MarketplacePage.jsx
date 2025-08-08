export default function MarketplacePage() {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Marketplace</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="border p-4 rounded shadow">
          <h3 className="text-xl font-semibold">Eco-friendly Bottle</h3>
          <p className="text-gray-600">20 RC</p>
          <button className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
            Buy
          </button>
        </div>
      </div>
    </div>
  );
}
