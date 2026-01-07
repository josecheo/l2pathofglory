interface Stat {
  label: string;
  value: string | number;
}
export default function ServerStats({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {stats.map((s, i) => (
        <div key={i} className="bg-lineageGray border border-gray-700 rounded-md p-4 text-center">
          <div className="text-sm text-gray-400">{s.label}</div>
          <div className="text-2xl text-lineageGold font-serif">{s.value}</div>
        </div>
      ))}
    </div>
  );
}
