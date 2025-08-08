export default function LeaderboardPage() {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Top Recyclers</h2>
      <ul className="space-y-2">
        <li className="bg-white p-4 rounded shadow flex justify-between">
          <span>Alice</span>
          <span>450 RC</span>
        </li>
        <li className="bg-white p-4 rounded shadow flex justify-between">
          <span>Bob</span>
          <span>390 RC</span>
        </li>
        <li className="bg-white p-4 rounded shadow flex justify-between">
          <span>Charlie</span>
          <span>350 RC</span>
        </li>
      </ul>
    </div>
  );
}
