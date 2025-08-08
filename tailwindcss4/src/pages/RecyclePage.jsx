export default function RecyclePage() {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Submit Recyclables</h2>
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
        <input type="file" className="w-full p-2" />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
